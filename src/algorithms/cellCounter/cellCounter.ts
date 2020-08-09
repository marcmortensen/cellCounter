
import { AlgorithmToRun } from '../algorithmToRun';
import { mkdirSync } from 'fs';

export class CellCounter extends AlgorithmToRun {

  name: string;
  numberOfCells: Array<number>;
  colorToGrayFn: null;
  
  constructor(name: string) {
    super(name);
    this.numberOfCells = new Array<number>();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  start(ij: any, NodeJavaCore: any): void {


      // eslint-disable-next-line no-debugger 
      debugger;
      
      const ImgPlusLoader = NodeJavaCore.import('ij.ImagePlus');
      const ImageConverter = NodeJavaCore.import('ij.process.ImageConverter');
      const ImgPlusSaver = NodeJavaCore.import('ij.io.FileSaver');
      const Auto_Threshold = NodeJavaCore.import('fiji.threshold.Auto_Threshold');
      

      const thresholderAlgorithm = 'IsoData'

      this.config.inputImagesPath.forEach((pathImage, index) => {
        // eslint-disable-next-line no-debugger
        debugger;


        const source = pathImage;
        console.log('==> Loading image: ' + source);
        //let dataset = ij.io().open(source);

        const imgPlus = ImgPlusLoader(source); 
        const imageConverter = ImageConverter(imgPlus);
        imageConverter.convertToGray8();

        const res = Auto_Threshold().exec(imgPlus, 
          thresholderAlgorithm,
          true,
          true,
          true,
          false,
          true,
          false)

        console.log(res);

        const saverGrayImage = ImgPlusSaver(res[1]);

        //ij.scifio().io().save(imgPlus.getImage(), this.config.outputPath + 'blurry.png')
        console.log('==> Processing image');
        //const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);

        //ij.op().convert().ops().image().watershed() ij.op().convert().ops().image().histogram()
        mkdirSync(this.config.outputPath , { recursive: true });
        const out = this.config.outputPath + 'blurry' + index + '.tif';

        saverGrayImage.saveAsTiff(out);
        console.log('==> Saving image: ' + out);
        
        //ij.scifio().datasetIO().save(imageGrey, out);
        console.log('==> Goodbye!');
        ij.context().dispose();

      });
  }

}


