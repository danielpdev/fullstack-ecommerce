import * as store from 'multer';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

export const configureDiskStorage = (serverPath = 'uploads/') => {
    return store.diskStorage({
        destination:(req,file,cb)=>{
            const isValid = MIME_TYPE_MAP[file.mimetype];
            let error = new Error("Invalid mime type");
            if (isValid) {
              error = null;
            }
            cb(error, serverPath);
        },
        filename:(req,file,cb)=>{
            const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
          const ext = MIME_TYPE_MAP[file.mimetype];

          cb(null, name + "-" + Date.now() + "." + ext);
        },
    });
};

export const getUploadHandler = (storage) => {
    return store({ storage }).single('image');
}
