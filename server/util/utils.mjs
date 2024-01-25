import multer from 'multer'

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      console.log(file)
      const name = file.originalname;
      cb(null, `${new Date().getTime()}-${name}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, file);
  },
});