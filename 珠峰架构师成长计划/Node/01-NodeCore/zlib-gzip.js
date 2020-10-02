const fs = require('fs')
const zlib = require('zlib')
const gzip = zlib.createGzip()
const inFile = fs.createReadStream('./extra/fileForCompress.txt')
const out = fs.createWriteStream('./extra/fileForCompress.txt.gz')

inFile.pipe(gzip).pipe(out)