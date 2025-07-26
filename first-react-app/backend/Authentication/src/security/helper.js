import fs from "fs";

const createUploadsFolder = () => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    console.log("Uploads folder created.");
};

export { createUploadsFolder };

