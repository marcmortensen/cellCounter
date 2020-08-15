
import { AlgorithmToRun } from '../algorithmToRun';
import { mkdirSync } from 'fs';
import { 
  ParticleAnalyzerOptions,
  MeasurementsOptions,
  IImagePlusLoader, 
  IImageConverterLoader,
  IFileSaverLoader, 
  IAutoThresholdLoader,
  ThresholdAlgorithms,
  IByteImageProcessor, 
  IGaussianBlurLoader,
  IEDMLoader,
  IParticleAnalyzerLoader,
  IResultsTableLoader,
  IImageJ} from '../../common/imageJTypes';
import { NodeAPI } from 'java';
import {basename, extname} from 'path';

export class CellCounter extends AlgorithmToRun {

  name: string;
  numberOfCells: number[];
  
  constructor(name: string) {
    super(name);
    this.numberOfCells = new Array<number>();
  }

  start(ij: IImageJ, NodeJavaCore: NodeAPI): void {

      
      const ImgPlusLoader: IImagePlusLoader = NodeJavaCore.import('ij.ImagePlus');
      const ImageConverter: IImageConverterLoader = NodeJavaCore.import('ij.process.ImageConverter');
      const ImgPlusSaver: IFileSaverLoader = NodeJavaCore.import('ij.io.FileSaver');
      const AutoThreshold: IAutoThresholdLoader = NodeJavaCore.import('fiji.threshold.Auto_Threshold');
      const GaussianBlur: IGaussianBlurLoader = NodeJavaCore.import('ij.plugin.filter.GaussianBlur');
      const EDM: IEDMLoader = NodeJavaCore.import('ij.plugin.filter.EDM');
      const ParticleAnalyzer: IParticleAnalyzerLoader = NodeJavaCore.import('ij.plugin.filter.ParticleAnalyzer');
      const ResultsTable: IResultsTableLoader = NodeJavaCore.import('ij.measure.ResultsTable');
      

      const thresholderAlgorithm = ThresholdAlgorithms.IsoData;

      this.config.inputImagesPath.forEach((pathImage: string) => {

        const inputImageName: string = basename(pathImage, extname(pathImage));
        const source = pathImage;
        console.log('==> Loading image: ' + source);

        const imgPlus = ImgPlusLoader(source); 
        const imageConverter = ImageConverter(imgPlus);
        imageConverter.convertToGray8();

        GaussianBlur().blurGaussian(imgPlus.getChannelProcessor(), 3)

        const res = AutoThreshold().exec(imgPlus, 
          thresholderAlgorithm,
          true,
          true,
          true,
          false,
          true,
          false)

        const imageProcessor = res[1].getChannelProcessor() as IByteImageProcessor;
        imageProcessor.erode(5, 0);
        imageProcessor.dilate(5, 0);

        EDM().toWatershed(imageProcessor);
        const resultTable = ResultsTable();

        const particleAnalyzer = ParticleAnalyzer(
          ParticleAnalyzerOptions.SHOW_OUTLINES,
          MeasurementsOptions.AREA,
          resultTable,
          0.0,
          10000000);
        particleAnalyzer.setHideOutputImage(true)
        particleAnalyzer.analyze(res[1]);
        const result = particleAnalyzer.getOutputImage();
        const saverOutlines = ImgPlusSaver(result);

        console.log('==> Processing image');

             
        const numberOfCells: number = resultTable.getCounter();
        this.numberOfCells.push(numberOfCells)

        mkdirSync(this.config.outputPath + '/csv', { recursive: true });
        const out = this.config.outputPath + numberOfCells + '_' + inputImageName + '.png';

        console.log('==> Saving image: ' + out);
        saverOutlines.saveAsPng(out);

        resultTable.save(this.config.outputPath + '/csv/' + inputImageName + '.csv')

        ij.context().dispose();

      });
  }

}


