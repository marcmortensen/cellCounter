## Compulsory params needed for the CellCounter algorithm:

**There params need to be added in a .env file on the root of the source (same level as src folder)**

*IMAGEJ_DIRECTORY_INSTALLED holds the fullpath to the image directory => '/fullpath/to/imageJ/directory'*
IMAGEJ_DIRECTORY_INSTALLED=''

*IMAGEJ_RUN_ALGORITHM holds the value of the algorithm to apply current options are => ['CellCounter'...]*
IMAGEJ_RUN_ALGORITHM=''

*INPUT_IMAGE_FOLDER Contains the full path to a folder where all the imags to process will be. Make sure the images names arent the same if the name is repeted it will overwrite the erlier image and csv, slash is required at the end*
INPUT_IMAGE_FOLDER=''

*OUTPUT_FOLDER once the process is done this is where the result will be placed, slash is required at the end*
OUTPUT_FOLDER=''

*THRESHOLD_ALGORITHM_NAME the algorithm used to generate the binary image, options are the following:*
*Default, Huang, Huang2, Intermodes, IsoData, Li, MaxEntropy, Mean, MinError,*
*Minimum, Moments, Otsu, Percentile, RenyiEntropy, Shanbhag, Triangle, Yen.*
THRESHOLD_ALGORITHM_NAME='IsoData'


## Optional params that CellCounter algorithm can use:

**There params need to be added in a .env file on the root of the source (same level as src folder)**

*SIGMA the bigger the value the stronger is the gaussian filter (aka redution of noise) recomended values between (1..3).*
FILTER_GAUSS_SIGMA='3'

*FILTER_MIN_SIZE Apply a filter which disregards blobs if the min size isnt reached in pixels.*
FILTER_MIN_SIZE='0'

*FILTER_MAX_SIZE Apply a filter which disregards blobs if the max size is surpassed in pixels.*
FILTER_MAX_SIZE='10000000'

*FILTER_MIN_CIRCULARITY Apply a filter which disregards blobs if they aren't circly enough*
FILTER_MIN_CIRCULARITY='0.0'

*FILTER_MAX_CIRCULARITY Apply a filter which disregards blobs if their circularity surpassed the given value.*
FILTER_MAX_CIRCULARITY='1.0'

