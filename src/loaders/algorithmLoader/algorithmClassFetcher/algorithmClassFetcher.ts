import { classes } from './algorithmClassRepository';
import { AlgorithmToRun } from '../../../algorithms/algorithmToRun';

class AlgorithmClassFetcher {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    constructor (className: string, args: any) {
        if (!className) {
            throw new Error('No algorithm to run was specified in the config!');
        }
        let subClassOfAlgorithmToRun: AlgorithmToRun;
        try {
            subClassOfAlgorithmToRun = new classes[className](args); 
        } catch (e) {
            throw new Error('Algorothm to run: ' + className + 
            ' was not found in algorithmClassRepository.ts, either the name on the config is wrong or you forgot to add the new class!');
        } 

        const isSubClassOfAlgorithmToRun = subClassOfAlgorithmToRun instanceof AlgorithmToRun;
        
        if (!isSubClassOfAlgorithmToRun) {
            throw new Error('All classes from algorithmClassRepository must extend from AlgorithmToRun');
        }
        return subClassOfAlgorithmToRun;
    }
}

export {AlgorithmClassFetcher};