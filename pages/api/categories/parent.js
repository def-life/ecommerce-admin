import dbConnect from "@/lib/mongoose";
import Category from "@/model/category";
import { ObjectId } from "mongodb";
import { isAdminRequest } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {

    try {
      await isAdminRequest(req, res)
      const { _id } = req.query;
      console.log(new ObjectId(_id))
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(_id),
          },
        },
        {
          $graphLookup: {
            from: Category.collection.name,
            startWith: '$parent',
            connectFromField: 'parent',
            connectToField: '_id',
            as: 'allParents',
            maxDepth: 32,
          },
        },
        // {
        //   $project: {
        //     allParents: {
        //       $concatArrays: ['$allParents.properties', '$properties']
        //     }
        //   }
        // }
        // {
        //   $project: {
        //   //  "allParents": {
        //   //   $map: {
        //   //     input: "$allParents",
        //   //     in: {
        //   //       properties: "$$this",
        //   //       _id: "$$this._id",
                
        //   //     }
        //   //   }
        //   //  },
        //   allParents: 1,
        //    properties: 1,
        //    _id: 1
        //   }
        // },
        // {
        //   $unwind: "$allParents"
        // }

        {
          $addFields: {
            combinedDocuments: {
              $concatArrays: [
                [{ _id: '$_id', properties: '$properties'}],
                '$allParents'
              ]
            }
          }
        },
        {
          $project: {
            combinedDocuments: 1,
            _id: 0
          }
        }

      ];

      let result = await Category.aggregate(pipeline);
      // if(result.length === 0) {
      //   res.status(200)
      //   res.json([])
      //   return
      // }

      result = result[0]?.combinedDocuments?.map((doc) => {
        return doc.properties
      })
      res.json(result.flat(Infinity))
      // res.json(result)
    } catch (err) {
      res.status(400)

      res.json({ message: err.message })
    }
  }




}
