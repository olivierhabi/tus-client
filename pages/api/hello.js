// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";
const tus = require('tus-node-server');

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

const server = new tus.Server();

const handler = nextConnect()
  // .post(async (req, res) => {
  //     const headers = {
  //         'Tus-Resumable': req.headers['tus-resumable'],
  //         'X-Auth-Key': req.headers['x-auth-key'],
  //         'X-Auth-Email': req.headers['x-auth-email'],
  //         'Upload-Length': req.headers['upload-length'],
  //         'Upload-Metadata': req.headers['upload-metadata'],
  //     };
  //     console.log(req.headers, '+++++++++++POST UPLOAD++++++++++++++++');

  //     const response = await fetch(
  //         'https://api.cloudflare.com/client/v4/accounts/a45cb02c0ecbce45a4e33bbbac7487f0/stream/',
  //         {
  //             method: 'POST',
  //             headers: headers,
  //         }
  //     );

  //     console.log(response, '===================RES===================');
  //     // res.statusCode = 400;
  //     // return res.json({ status: 'success' });
  // })
  .post(async (req, res) => {
    server.datastore = new tus.FileStore({
      path: "/files",
    });
    // const post = await models.users.findAll();
    // console.log(post);
    // res.statusCode = 200;
    // return res.json({ status: "success" });
  });

export default handler;