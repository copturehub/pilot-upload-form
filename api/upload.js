export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Endast POST tillåtet' });
  }

  const busboy = require('busboy');
  const bb = busboy({ headers: req.headers });

  let fileInfo = [];

  bb.on('file', (name, file, info) => {
    fileInfo.push(info);
    file.resume(); // Vi läser inte innehållet just nu
  });

  bb.on('finish', () => {
    res.status(200).json({ message: 'Filer mottagna', files: fileInfo });
  });

  req.pipe(bb);
}
