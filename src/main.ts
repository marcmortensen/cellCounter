import { AlgorithmApplier } from './loaders/algorithmLoader/algorithmApplier/algorithmApplier';

try {
    const imageJ = new AlgorithmApplier(process.env.IMAGEJ_RUN_ALGORITHM);
    imageJ.runWithConfig();
}
catch(e) {
    console.error(e);
}