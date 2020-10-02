const fs = require('fs')
const zlib = require('zlib')
const gunzip = zlib.createGunzip()
const inFile = fs.createReadStream('./extra/fileForCompress.txt.gz')
const outFile = fs.createWriteStream('./extra/fileForCompress-1.txt')

inFile.pipe(gunzip).pipe(outFile)