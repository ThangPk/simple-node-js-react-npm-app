export const PAGE_SIZE = 10;
export const PAGE_SIZE_ALL = 10000;
export const PAGE_ONE = 1;
export const DOWNLOAD_TEMPLETE_CAMERA_CSV_URL =
  document.location.protocol +
  "//" +
  document.location.host +
  "/download/sample-csv";
export const DOWNLOAD_TEMPLETE_LICENSE_PLATE_CSV_URL =
  document.location.protocol +
  "//" +
  document.location.host +
  "/download/sample-license-plate-csv";
export const DOWNLOAD_CAMERA_EXPORT_CSV_URL =
  document.location.protocol +
  "//" +
  document.location.host +
  "/download/camera-export";
export const BASE_IMAGE_MAP_URL =   document.location.protocol + "//" + document.location.host + "/api/1.0/";
// export const BASE_IMAGE_MAP_URL = "http://116.193.74.93:9000/api/1.0/";
// export const BASE_STREAMING_URL = "http://116.193.74.93:9000/streaming/live/";
export const BASE_STREAMING_URL =   document.location.protocol + "//" + document.location.host + "/streaming/live/";
export const HSL_STREAM = "/stream.m3u8";
export const HSL_STREAM_MAIN = "/main/stream0.m3u8"
export const HSL_STREAM_SUB = "/sub/stream0.m3u8"
export const ItemTypes = {
  CAMERA: "camera"
};

export const CUSTOM_REACT_SELECT_STYPE = {
  control: base => ({
    ...base,
    height: "34px",
    "min-height": "34px"
  })
};
