
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IImageJ {
    io(): IIOService;
    op(): IOpService;
    context(): IImageJContext;
    scifio(): ISCIFIO;
  }  

export interface ISCIFIO {
  datasetIO(): IIOService;
}

export interface IOpService {
  coloc(): any;
  context(): IImageJContext;
  convert(): any; 
  copy(): any;
  create(): any;
  deconvolve(): any;
  dispose(): void;
  eval(evalName: string): any;
  filter(): any;
  geom(): any;
  getClass(): any;
  getContext(): IImageJContext;
  getIdentifier(): string;
  getInfo(): any;
  getLocation(): string;
  getPluginService(): any;
  getPluginType(): any;
  getPlugins(): any;
  getPriority(): number;
  getVersion(): string;
  haralick(): any;
  hashCode(): number;
  help(): string;
  image(): any;
  imagemoments(): any;
  info(className: any): any;
  infos(): any;
  initialize(): void;
  labeling(): any;
  lbp(): any;
  linalg(): any;
  log(): any;
  logic(): any;
  matcher(): any;
  math(): any;
  morphology(): any;
  namespace(javaClass: any): any;
  notify(): any;
  notifyAll(): any;
  ops(): any;
  parent(): any;
  pluginService(): any;
  registerEventHandlers(): void;
  run(methodPath: string, originImg: IImageJDataset, params: any): IImageJDataset;
  setContext(context: IImageJContext):void;
  stats(): any;
  tamura(): any;
  thread(): any;
  threshold(): any;
  toString(): string;
  topology(): any;
  transform(): any;
  wait(): any;
  zernike(): any;
}

export interface IIOService {
  context(): IImageJContext;
  dispose(): void;
  getClass(): any;
  getContext(): IImageJContext;
  getInfo(): any;
  getInstances(): any;
  getLocation(): string;
  getOpener(opener: string): any;
  getPriority(): number;
  getSaver(object: any, name: string): any;
  getType(): any;
  getVersion(): string;
  hashCode(): number;
  initialize(): void;
  log(): any;
  open(path: string): IImageJDataset;
  save(dataset: IImageJDataset, path: string): void; 
  toString(): string;
}

export interface IImageJDataset {
  axes(axis: Array<any>): any;
  context(): IImageJContext;
  copy(): IImageJDataset;
  copyDataFrom(copyFrom: IImageJDataset): void;
  copyInto(copyInto: IImageJDataset): void;
  cursor(): any;
  decrementReferences(): any;
  dimension(axisType: any | number): number;
  dimensionIndex(aixsType: any): number;
  dimensions(arr: Array<number>): any;
  duplicate(): IImageJDataset;
  duplicateBlank(): IImageJDataset;
  firstElement(): any;
  getBytesOfInfo(): number; 
  getChannelMaximum(channel: number): number;
  getChannelMinimum(channel: number): number;
  getChannels(): number;
  getColorTable(n: number): any;
  getColorTableCount(): number;
  getCompositeChannelCount(): number;
  getContext(): IImageJContext;
  getDepth(): number;
  getFrames(): number;
  getHeight(): number;
  getImgPlus(): any;
  getName(): string;
  getPlane(nPlane: number, flag?: boolean): Array<number>;
  getProperties(): any;
  getSource(): string;
  getType(): any;
  getTypeLabelLong(): string;
  getTypeLabelShort(): string;
  getValidBits(): number;
  getWidth(): number;
  hashCode(): number;
  incrementReferences(): any;
  initializeColorTables(number: number): any; 
  isDirty(): boolean;
  isInteger(): boolean;
  isRGBMerged(): boolean;
  isSigned(): boolean;
  iterationOrder(): any;
  iterator(): any;
  localizingCursor(): any;
  max(input: Array<number> | number): number
  min(input: Array<number> | number): number
  notify(): any;
  notifyAll(): any;
  numDimensions(): number;
  randomAccess(): any;
  realMax(input: Array<number> | number): number
  realMin(input: Array<number> | number): number
  rebuild(): void;
  rgbChange(): void;
  setAxes(axis: any): any; 
  setAxis(axis: any): any; 
  setChannelMaximum(channel: number, double: number): void
  setChannelMinimum(channel: number, double: number): void
  setColorTable(colorTable: any, number: number): any;
  setCompositeChannelCount(nchannels: number): void;
  setDirty(isDirty: boolean): void
  setImgPlus(imgPlus: IImagePlus): void;
  setName(name: string): void;
  setPlane(int: number, object: any): any;
  setPlaneSilently(int: number, object: any): any;
  setRGBMerged(isRGBMerged: boolean): void; 
  setSource(source: string): void;
  setValidBits(int: number): void
  size(): number;
  spliterator(): any;
  toString(): string; 
  typeChange(): void;
  typedImg(realType: any): any; 
  update(): void;
  wait(): any;
}

export interface IImageJContext {
  dispose(): void;
  getClass(): any;
  getPluginIndex(): any;
  getService(javaClass: any | string ): any;
  getServiceIndex(): any;
  hashCode(): number;
  inject(injectService: any): any;
  isInjectable(javaClass: any): boolean;
  isStrict(): boolean;
  notify(): any;
  notifyAll(): any;
  service(javaClass: any | string): any;
  setStrict(isStrict: boolean): void;
  toString(): string;
  wait(): any;
}

export enum ParticleAnalyzerOptions {
  /** Display results in the ImageJ console. */
  SHOW_RESULTS = 1,
      
  /** Display image containing outlines of measured particles. */
  SHOW_OUTLINES = 4,

  /** Do not measure particles touching edge of image. */
  EXCLUDE_EDGE_PARTICLES = 8,

  /** Display image containing grayscales masks that identify measured particles. */
  SHOW_ROI_MASKS = 16,

  /** Display a progress bar. */
  SHOW_PROGRESS = 32,

  /** Clear "Results" window before starting. */
  CLEAR_WORKSHEET = 64,

  /** Record starting coordinates so outline can be recreated later using doWand(x,y). */
  RECORD_STARTS = 128,

  /** Display a summary. */
  DISPLAY_SUMMARY = 256,

  /** Do not display particle outline image. */
  SHOW_NONE = 512,

  /** Flood fill to ignore interior holes. */
  INCLUDE_HOLES = 1024,

  /** Add particles to ROI Manager. */
  ADD_TO_MANAGER = 2048,

  /** Display image containing binary masks of measured particles. */
  SHOW_MASKS = 4096,

  /** Use 4-connected particle tracing. */
  FOUR_CONNECTED = 8192,

  /** Replace original image with masks. */
  IN_SITU_SHOW = 16384,

  /** Display particle outlines as an overlay. */
  SHOW_OVERLAY_OUTLINES = 32768,

  /** Display filled particle as an overlay. */
  SHOW_OVERLAY_MASKS = 65536,
}

export enum MeasurementsOptions {

  AREA=1,
  MEAN=2,
  STD_DEV=4,
  MODE=8,
  MIN_MAX=16,
  CENTROID=32,
  CENTER_OF_MASS=64,
  PERIMETER=128,
  LIMIT=256,
  RECT=512,
  LABELS=1024,
  ELLIPSE=2048,
  INVERT_Y=4096,
  CIRCULARITY=8192,
  SHAPE_DESCRIPTORS=8192,
  FERET=16384,
  INTEGRATED_DENSITY=0x8000,
  MEDIAN=0x10000,
  SKEWNESS=0x20000,
  KURTOSIS=0x40000,
  AREA_FRACTION=0x80000, 
  SLICE=0x100000,
  STACK_POSITION=0x100000,
  SCIENTIFIC_NOTATION=0x200000,
  ADD_TO_OVERLAY=0x400000,
  NaN_EMPTY_CELLS=0x80000
}

export enum ThresholdAlgorithms {

  Default = 'Default',
  Huang = 'Huang',
  Huang2 = 'Huang2',
  Intermodes = 'Intermodes',
  IsoData = 'IsoData',
  Li = 'Li',
  MaxEntropy = 'MaxEntropy',
  Mean = 'Mean',
  MinError = 'MinError(I)',
  Minimum = 'Minimum',
  Moments = 'Moments',
  Otsu = 'Otsu',
  Percentile = 'Percentile',
  RenyiEntropy = 'RenyiEntropy',
  Shanbhag = 'Shanbhag',
  Triangle = 'Triangle',
  Yen = 'Yen'
}


export interface IImageJLoader {
  (): IImageJ;
}

export interface IImagePlusLoader {
  (path: string): IImagePlus;
  (): IImagePlus;
  (title: string, ip: IImageProcessor): IImagePlus
}

export interface IFileSaverLoader {
  (img: IImagePlus): IFileSaver;

}
export interface IAutoThresholdLoader {
  (): IAutoThreshold;
}

export interface IGaussianBlurLoader {
  (): IGaussianBlur;
}

export interface IEDMLoader {
  (): IEDM;
}

export interface IParticleAnalyzerLoader {
  //Default constructor
  (): IParticleAnalyzer;
  
  //Constructs a ParticleAnalyzer using the default min and max circularity values (0 and 1).
  (options: number, measurements: number, rt: IResultsTable, minSize: number, maxSize: number): IParticleAnalyzer;
  (options: number, measurements: number, rt: IResultsTable, minSize: number, maxSize: number, minCirc: number, maxCirc: number): IParticleAnalyzer;
}

export interface IResultsTableLoader {
  //Default constructor
  (): IResultsTable;
  (nRows: number): IResultsTable;
}

export interface IResultsTable {
  //Adds a label to the beginning of the current row.
  addLabel(label: string): void;

  //Adds a value to the end of the given column.
  addValue(column: number, value: number): void;

  //Adds a value to the end of the given column.
  addValue(column: string, value: number): void;

  //Adds a string value to the end of the given column.
  addValue(column: string, value: string):void;

  clone(): IResultsTable;

  columnExists(column: number): boolean;
  columnExists(column: string): boolean;
  
  //This is a version of IJ.d2s() that uses scientific notation for small numbes that would otherwise display as zero.
  d2s(n: number, decimalPlaces: number): string;
  deleteColumn(column: string): void;
  deleteRow(rowIndex: number): void;
  deleteRows(index1: number, index2: number): void;
  getColumn(column: number): Array<number>;
  getColumnAsDoubles(column: number): Array<number>;

  //Returns the heading of the specified column or null if the column is empty.
  getColumnHeading(column: number): string
  
  //Returns the index of the first column with the given heading.
  getColumnIndex(heading: string): number;

  // Returns the current value of the measurement counter.
  getCounter(): number;

  getDefaultHeading(index: number): string;
  getDefaultHeadings(): Array<string>;

  // Sets the heading of the the first available column and returns that column's index
  getFreeColumn(heading: string): number;
  // Returns the column headings as an array of Strings.
  getHeadings(): Array<string>;

  // Returns the label of the specified row.
  getLabel(row: number): string;

  // Returns the index of the last used column, or -1 if no columns are used.
  getLastColumn(): number;

  // Returns the string value of the given column and row, where column must be less than or equal the value returned by getLastColumn() and row must be greater than or equal zero and less than the value returned by size().
  getStringValue(column: number, row: number): string;
  // Returns the string value of the given column and row, where row must be greater than or equal zero and less than the value returned by size().
  getStringValue(column: string, row: number): string;

  // Returns the value of the specified column and row, where column is the column heading and row is a number greater than or equal zero and less than value returned by size().
  getValue(column: string, row: number): number;

  //Returns the value of the given column and row, where column must be less than or equal the value returned by getLastColumn() and row must be greater than or equal zero and less than the value returned by size().
  getValueAsDouble(column: number, row: number): number;

  //Increments the measurement counter by one.
  incrementCounter(): void;

  // Opens a tab or comma delimited text file and returns it as a ResultsTable, without requiring a try/catch statement.
  open2(path: string): IResultsTable;

  // Changes the name of a column.
  renameColumn(oldName: string, newName: string): void;
  reset(): void;
  // Saves this ResultsTable as a tab or comma delimited text file.
  save(path: string);
  setDecimalPlaces(column: number, digits: number): void; 

  // Sets the headings used by the Measure command ("Area", "Mean", etc.).
  setDefaultHeadings(): void;

  //Set 'true' to initially fill data arrays with NaNs instead of zeros.
  setNaNEmptyCells(NaNEmptyCells: boolean): void;

  // Sets the decimal places (digits to the right of decimal point) that are used when this table is displayed.
  setPrecision(precision: number): void;

  // Sets the value of the given column and row, where where 0<=column<=(lastRow+1 and 0<=row<=size().
  setValue(column: number, row: number, value: number): void;
  // Sets the value of the given column and row, where where 0<=column<=(lastRow+1 and 0<=row<=size().
  setValue(column: number, row: number, value: string): void;
  // Sets the value of the given column and row, where where 0<=column<=(lastRow+1 and 0<=row<=size().
  setValue(column: string, row: number, value: number): void;
  // Sets the value of the given column and row, where where 0<=column<=(lastRow+1 and 0<=row<=size().
  setValue(column: string, row: number, value: string): void;

  showRowIndexes(showIndexes: boolean): void;
  showRowNumbers(showNumbers: boolean): void; 
  
  // Returns the size of this ResultsTable.
  size(): number;
  //Sorts this table on the specified column, with string support.
  sort(column: string): void;

}

export interface IParticleAnalyzer {
  // Performs particle analysis on the specified image.
  analyze(img: IImagePlus): boolean;
  // Performs particle analysis on the specified ImagePlus and ImageProcessor.
  analyze(img: IImagePlus, ip: IImageProcessor): boolean;

  getOutputImage(): IImagePlus;
  setHideOutputImage(hideOutputImage: boolean): void;
  setResultsTable(rt: IResultsTable): void;
  setSummaryTable(rt: IResultsTable): void;
}

export interface IEDM {
  //Converts a binary image into a 8-bit grayscale Euclidean Distance Map (EDM).
  toEDM(ip: IImageProcessor): void;

  //Do watershed segmentation based on the EDM of the foreground objects (nonzero pixels) in an 8-bit image.
  toWatershed(ip: IImageProcessor): void;
}


export interface IGaussianBlur {
  blurGaussian(ip: IImageProcessor, sigma: number): void;
  blurGaussian(ip: IImageProcessor, sigmaX: number, sigmaY: number, accuracy: number): void;
}

export interface IAutoThreshold {
  exec(
    inputImg: IImagePlus,
    thresholdAlgorithmName: ThresholdAlgorithms,
    noWhite: boolean,
    noBlack: boolean,
    doIwhite: boolean,
    doIset: boolean,
    doIlog: boolean,
    doIstackHistogram: boolean
     ): [number, IImagePlus];
  
}

export interface IFileSaver {
  //Returns a string containing information about the specified image.
	getDescriptionString(): string;
  
  //Sets the current JPEG quality setting (0-100).
  setJpegQuality(quality: number): void;

  //Returns the current JPEG quality setting (0-100).
  getJpegQuality(): number;

  okForFits(img: IImagePlus): boolean;
  okForGif(img: IImagePlus): boolean;
  okForJpeg(img: IImagePlus): boolean; 

  // Resaves the image.
  save(): boolean;
  saveAsBmp(path: string): boolean;
  saveAsFits(path: string): boolean;
  saveAsGif(path: string): boolean;
  saveAsJpeg(path: string): boolean;
  saveAsLut(path: string): boolean;
  saveAsPgm(path: string): boolean;
  saveAsPng(path: string): boolean;
  saveAsRaw(path: string): boolean;
  saveAsRawStack(path: string): boolean;
  saveAsText(path: string): boolean;
  saveAsTiff(path: string): boolean;
  saveAsTiffStack(path: string): boolean;
  saveAsZip(path: string): boolean;
}

export interface IImageConverterLoader {
  (img: IImagePlus): IImageConverter;
}

export interface IImagePlus {
  getChannelProcessor(): IImageProcessor;
}

export interface IImageConverter {
  convertHSBToRGB(): void;
  convertLabToRGB(): void;
  convertRGBStackToRGB(): void;
	convertRGBtoIndexedColor(nColors: number): void;
	convertToGray16(): void;
  convertToGray32(): void;
  convertToGray8(): void;
  convertToHSB(): void;
  convertToLab(): void;
  convertToRGB(): void;
  convertToRGBStack(): void;
  getDoScaling(): boolean;
  setDoScaling(scaleConversions: boolean): boolean;
}

export interface IImageProcessor {
  erode(): void;
  dilate(): void;
}

export interface IByteImageProcessor extends IImageProcessor {
  erode(count: number, background: number): void;
  erode(): void;
  dilate(count: number, background: number): void;
  dilate(): void;
}