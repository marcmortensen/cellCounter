
import { AlgorithmToRun } from '../algorithmToRun';
import { mkdirSync } from 'fs';
import { IImageJ } from '../../common/imageJTypes';

export class FilterGauss extends AlgorithmToRun {

  start(ij: IImageJ): void {

      this.config.inputImagesPath.forEach((pathImage) => {
        const source = pathImage;
        console.log('==> Loading image: ' + source);
        // eslint-disable-next-line no-debugger
        debugger;
        const dataset = ij.io().open(source);
        console.log('==> Processing image');
        const filtered = ij.op().run('filter.gauss', dataset, [8, 10, 1]);
        mkdirSync(this.config.outputPath , { recursive: true });
        const out = this.config.outputPath + 'blurry.png';
        console.log('==> Saving image: ' + out);
        ij.io().save(filtered, out);
        console.log('==> Goodbye!');
        ij.context().dispose();
      });
  }

}


