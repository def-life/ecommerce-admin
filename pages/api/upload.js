import multer from "multer"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { generateRandomImgNames } from "@/utils/utilities";
import dbConnect from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
const storage = multer.memoryStorage()

const bucketName = "abhi-nextjs-ecommerce"
const region = "ap-south-1"
const upload = multer({ storage: storage })
export default async function handler(req, res) {
    await dbConnect()
    try {
        await isAdminRequest(req, res)
        upload.array('product_images')(req, res, async (err) => {

            if (err) {
                console.log(err)
                return res.status(400).json({ error: err.message });
            }
            if (!req.files) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            try {
                const client = new S3Client({
                    region,
                    credentials: {
                        accessKeyId: process.env.S3_ACCESS_KEY,
                        secretAccessKey: process.env.S3_SECRET_KEY,
                    }
                });

                const links = []

                for (const file of req.files) {
                    const key = generateRandomImgNames()
                    const params = {
                        Bucket: bucketName,
                        Key: key,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                        ACL: "public-read"
                    };
                    const command = new PutObjectCommand(params);
                    const result = await client.send(command);
                    console.log("result", result)
                    const link = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
                    links.push(link)
                    console.log(link)
                }
                res.status(200).json({ links });
            } catch (error) {
                // error handling.
                console.log(error);
                res.status(200).json({ message: error.message });
            }

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

export const config = {
    api: {
        bodyParser: false
    },
}
