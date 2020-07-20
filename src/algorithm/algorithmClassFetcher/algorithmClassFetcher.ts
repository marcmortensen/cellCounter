/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {FilterGauss} from '../algorithms/filterGauss/filterGauss';

const classes = {
  FilterGauss
};

class AlgorithmClassFetcher {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor (className: string, args: any) {
        return new classes[className](args);
    }
}

export default AlgorithmClassFetcher;