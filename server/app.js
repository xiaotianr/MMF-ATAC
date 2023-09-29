const express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./sql.js"),
    // mysql=require('mysql2/promise')
    multiparty = require('multiparty'),
    fs = require('fs'),
    // { PythonShell } = require('python-shell'),
    spawn = require('child_process').spawn,
    archiver = require('archiver'),
    nodemailer = require("nodemailer"),
    path = require('path')
// SparkMD5 = require('spark-md5')


const app = express(),
    PORT = 8081,
    // HOST = '0.0.0.0',
    HOST = 'localhost',
    HOSTNAME = `${HOST}:${PORT}`;

// const pool=mysql.createPool({
//     connectionLimit: 10,    // 连接数量
//     // host:"192.168.3.15",
//     host:'localhost',
//     port:3306,
//     user:'root',
//     // user:'wuxt',
//     password:'123456',
//     // password:'wxt123456',
//     database:'gse'
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 提供前端构建产物
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.post('/getHomogse', async (req, res) => {
    // type:"tissue"  "cell line" "primary cell" "in vitro differentiated cells"
    var type = req.body.type;
    // [_type]=checkBody(type),
    // resData = getHomogseData(type);
    // console.log(type);
    db.query(`select * from all_homo_mus where GEO_number like '%${type}%'`, function (err, data) {
        // console.log(data)
        if (err) throw err;
        if (data.length === 0) {
            res.send({
                errorNo: 404,
                errorMsg: 'No Data'
            });
            return;
        }
        res.send({
            errorNo: 0,
            data: data
        });
    })
})


// 延迟函数
const delay = function delay(interval) {
    typeof interval !== "number" ? interval = 1000 : null;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

const exists = function exists(path) {
    return new Promise(resolve => {
        fs.access(path, fs.constants.F_OK, err => {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};
// 创建文件并写入到指定的目录 & 返回客户端结果


app.post("/mmgraph", (req, res, next) => {
    const model = './MMGraph/run.py',
        name = req.body.name,
        username = req.body.username,
        species = req.body.species;

    let task_content = 'TFBSs prediction and Multiple motifs finding'
    console.log(name, species, task_content, username)

    let py1 = spawn('python', [model, name, 1, species]);
    console.log('run1')
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species]);
        console.log('run2')
        py2.on('close', function (code) {
            let py3 = spawn('python', [model, name, 3, species]);
            console.log('run3')
            py3.on('close', function (code) {
                let py4 = spawn('python', [model, name, 4, species]);
                console.log('run4')
                py4.on('close', function (code) {
                    let py5 = spawn('python', [model, name, 5, species]);
                    console.log('run5')
                    py5.on('close', function (code) {
                        let py6 = spawn('python', [model, name, 6, species]);
                        console.log('run6')
                        py6.stdout.on('data', function (data) {
                            console.log('stdout: py6:' + data);
                        })
                        py6.stderr.on('data', (data) => {
                            console.error(`错误输出：${data}`);
                        });
                        py6.on('close', function (code) {
                            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                                if (err) {
                                    zip_file(name)
                                }
                            });
                            if (username) {
                                console.log('insert start')
                                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'MMGraph', species, task_content], (err, results, fields) => {
                                    if (err) throw err;
                                    else {
                                        console.log('insert end')
                                    }
                                })
                            }
                            let modeldel = './MMGraph/delete.py'
                            let pydel = spawn('python', [modeldel, name]);
                            pydel.on('close', function (code) { res.end() })
                        })
                    })
                })
            });
        });
    });
});

app.post("/hint", (req, res, next) => {
    const model = './HINT-ATAC/run.py',
        path = "./upload/",
        name = req.body.name,
        username = req.body.username,
        species = req.body.species,
        database = req.body.database;

    let task_content = 'TFBSs prediction and Motif database comparison'
    console.log(name, species, task_content, username, database)
    let py1 = spawn('python', [model, name, 1, species, database]);
    py1.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    })
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species, database]);
        py2.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        })
        py2.on('close', function (code) {
            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                if (err) {
                    zip_file(name)
                }
            });
            if (username) {
                console.log('insert start')
                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'HINT-ATAC', species, task_content], (err, results, fields) => {
                    if (err) throw err;
                    else {
                        console.log('insert end')
                    }
                })
            }
            let modeldel = './MMGraph/delete.py'
            let pydel = spawn('python', [modeldel, name]);
            pydel.on('close', function (code) { res.end() })
        })
    });
});
app.post("/tobias", (req, res, next) => {
    const model = './TOBIAS/run.py',
        name = req.body.name,
        username = req.body.username,
        species = req.body.species,
        database = req.body.database;
    let task_content = 'TFBSs prediction and Motif database comparison'
    console.log(name, species, task_content, username)
    let py1 = spawn('python', [model, name, 1, species, database]);
    py1.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    })
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species, database]);
        py2.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        })
        py2.on('close', function (code) {
            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                if (err) {
                    zip_file(name)
                }
            });
            if (username) {
                console.log('insert start')
                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'TOBIAS', species, task_content], (err, results, fields) => {
                    if (err) throw err;
                    else {
                        console.log('insert end')
                    }
                })
            }
            let modeldel = './MMGraph/delete.py'
            let pydel = spawn('python', [modeldel, name]);
            pydel.on('close', function (code) { res.end() })
        })
    });
});



app.post("/mmgraph_mail", (req, res, next) => {
    const model = './MMGraph/run.py',
        name = req.body.name,
        username = req.body.username,
        species = req.body.species,
        mail = req.body.mail;
    let task_content = 'TFBSs prediction and Multiple motifs finding'
    let py1 = spawn('python', [model, name, 1, species]);
    console.log('run1')
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species]);
        console.log('run2')
        py2.on('close', function (code) {
            let py3 = spawn('python', [model, name, 3, species]);
            console.log('run3')
            py3.on('close', function (code) {
                let py4 = spawn('python', [model, name, 4, species]);
                console.log('run4')
                py4.on('close', function (code) {
                    let py5 = spawn('python', [model, name, 5, species]);
                    console.log('run5')
                    py5.on('close', function (code) {
                        let py6 = spawn('python', [model, name, 6, species]);
                        console.log('run6')
                        py6.stdout.on('data', function (data) {
                            console.log('stdout: py6:' + data);
                        })
                        py6.stderr.on('data', (data) => {
                            console.error(`错误输出：${data}`);
                        });
                        py6.on('close', function (code) {
                            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                                if (err) {
                                    zip_file(name)
                                }
                            });
                            if (username) {
                                console.log('insert start')
                                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'MMGraph', species, task_content], (err, results, fields) => {
                                    if (err) throw err;
                                    else {
                                        console.log('insert end')
                                    }
                                })
                            }
                            sendMail(mail, name)
                            let modeldel = './MMGraph/delete.py'
                            let pydel = spawn('python', [modeldel, name]);
                            pydel.on('close', function (code) { res.end() })
                        })
                    })
                })
            });
        });
    });
});

app.post("/hint_mail", (req, res, next) => {
    const model = './HINT-ATAC/run.py',
        path = "./upload/",
        name = req.body.name,
        username = req.body.username,
        species = req.body.species,
        database = req.body.database,
        mail = req.body.mail;
    let task_content = 'TFBSs prediction and Motif database comparison'
    let py1 = spawn('python', [model, name, 1, species, database]);
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species, database]);
        console.log('run2')
        py2.on('close', function (code) {
            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                if (err) {
                    zip_file(name)
                }
            });
            if (username) {
                console.log('insert start')
                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'HINT-ATAC', species, task_content], (err, results, fields) => {
                    if (err) throw err;
                    else {
                        console.log('insert end')
                    }
                })
            }
            sendMail(mail, name);
            let modeldel = './MMGraph/delete.py'
            let pydel = spawn('python', [modeldel, name]);
            pydel.on('close', function (code) { res.end() })
        })
    });
});
app.post("/tobias_mail", (req, res, next) => {
    const model = './TOBIAS/run.py',
        name = req.body.name,
        username = req.body.username,
        species = req.body.species,
        database = req.body.database,
        mail = req.body.mail;
    let task_content = 'TFBSs prediction and Motif database comparison'
    console.log(name, species, task_content, username)
    let py1 = spawn('python', [model, name, 1, species, database]);
    py1.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    })
    py1.on('close', function (code) {
        let py2 = spawn('python', [model, name, 2, species, database]);
        py2.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        })
        py2.on('close', function (code) {
            fs.access(`${downloadDir}/${name}.zip`, fs.constants.F_OK, (err) => {
                if (err) {
                    zip_file(name)
                }
            });
            if (username) {
                console.log('insert start')
                db.query(`insert into task values (?,?,?,?,?)`, [name, username, 'TOBIAS', species, task_content], (err, results, fields) => {
                    if (err) throw err;
                    else {
                        console.log('insert end')
                    }
                })
            }
            sendMail(mail, name);
            let modeldel = './MMGraph/delete.py'
            let pydel = spawn('python', [modeldel, name]);
            pydel.on('close', function (code) { res.end() })
        })
    });
});


const downloadDir = `${__dirname}/download`;
app.post('/mmgraph_already', async (req, res) => {
    let name = req.body.name;
    let file = `./download/${name}.zip`;
    try {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (err) {
                file = `./download/${name}/output/${name}_encode_val.txt`;
                fs.access(file, fs.constants.F_OK, (err) => {
                    if (err) {
                        file = `./save/${name}/data/encode_tfbs.txt`;
                        fs.access(file, fs.constants.F_OK, (err) => {
                            if (err) {
                                file = `./save/${name}/${name}_final_hint_tobias.bed`;
                                // console.log(file)
                                fs.access(file, fs.constants.F_OK, (err) => {
                                    if (err) {
                                        // console.log(0)
                                        res.send({
                                            schedule: 0,
                                        });
                                        return;
                                    }
                                    else {
                                        // console.log(1)
                                        res.send({
                                            schedule: 1,
                                        });
                                        return;
                                    }
                                });
                            }
                            else {
                                // console.log(2)
                                res.send({

                                    schedule: 2,
                                });
                                return;
                            }
                        });
                    }
                    else {
                        // console.log(3)
                        res.send({
                            schedule: 3,
                        });
                        return;
                    }
                });
            }
            else {
                // console.log(4)
                res.send({

                    schedule: 4,
                });
                return;
            }
        })
    } catch (err) {
        res.send({
            schedule: -1
        });
        return;
    }
    // file = `./save/${name}/${name}_final_hint_tobias.bed`;
    // try {
    //     fs.access(file, fs.constants.F_OK, (err) => {
    //         if (err) {
    //             res.send({
    //                 schedule: 0,
    //             });
    //             return;
    //         }
    //         else {
    //             file = `./save/${name}/data/encode_tfbs.txt`;
    //             fs.access(file, fs.constants.F_OK, (err) => {
    //                 if (err) {
    //                     res.send({
    //                         schedule: 1,
    //                     });
    //                     return;
    //                 }
    //                 else {
    //                     file = `./save/${name}/output/${name}_encode_val.txt`;
    //                     fs.access(file, fs.constants.F_OK, (err) => {
    //                         if (err) {
    //                             res.send({

    //                                 schedule: 2,
    //                             });
    //                             return;
    //                         }
    //                         else {
    //                             file = `./download/${name}.zip`;
    //                             fs.access(file, fs.constants.F_OK, (err) => {
    //                                 if (err) {
    //                                     res.send({

    //                                         schedule: 3,
    //                                     });
    //                                     return;
    //                                 }
    //                                 else {
    //                                     res.send({
    //                                         schedule: 4,
    //                                     });
    //                                     return;
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // } catch (err) {
    //     res.send({
    //         schedule: -1
    //     });
    //     return;
    // }
});

app.post('/hint_already', async (req, res) => {
    let name = req.body.name;
    let file = `./download/${name}.zip`;
    try {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (err) {
                file = `./save/${name}/hint_${name}.bed`;
                fs.access(file, fs.constants.F_OK, (err) => {
                    if (err) {
                        res.send({
                            schedule: 0,
                        });
                        return;
                    }
                    else {
                        res.send({
                            schedule: 1,
                        });
                        return;
                    }
                });
            }
            else {
                res.send({
                    schedule: 2,
                });
                return;
            }
        })
    } catch (err) {
        res.send({
            schedule: -1
        });
        return;
    }

    // file = `./save/${name}/hint_${name}.bed`;
    // try {
    //     fs.access(file, fs.constants.F_OK, (err) => {
    //         if (err) {
    //             res.send({
    //                 schedule: 0,
    //             });
    //             return;
    //         }
    //         else {
    //             file = `./download/${name}.zip`;
    //             fs.access(file, fs.constants.F_OK, (err) => {
    //                 if (err) {
    //                     res.send({
    //                         schedule: 1,
    //                     });
    //                     return;
    //                 }
    //                 else {
    //                     res.send({
    //                         schedule: 2,
    //                     });
    //                     return;
    //                 }
    //             });
    //         }
    //     });
    // } catch (err) {
    //     res.send({
    //         schedule: -1
    //     });
    //     return;
    // }
});
app.post('/tobias_already', async (req, res) => {
    let name = req.body.name;
    let file = `./download/${name}.zip`;
    try {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (err) {
                file = `./save/${name}/${name}_tobias_footprint.bed`;
                fs.access(file, fs.constants.F_OK, (err) => {
                    if (err) {
                        res.send({
                            schedule: 0,
                        });
                        return;
                    }
                    else {
                        res.send({
                            schedule: 1,
                        });
                        return;
                    }
                });
            }
            else {
                res.send({
                    schedule: 2,
                });
                return;
            }
        })
    } catch (err) {
        res.send({
            schedule: -1
        });
        return;
    }
    // file = `./save/${name}/${name}_tobias_footprint.bed`;
    // try {
    //     fs.access(file, fs.constants.F_OK, (err) => {
    //         if (err) {
    //             res.send({
    //                 schedule: 0,
    //             });
    //             return;
    //         }
    //         else {
    //             file = `./download/${name}.zip`;
    //             fs.access(file, fs.constants.F_OK, (err) => {
    //                 if (err) {
    //                     res.send({
    //                         schedule: 1,
    //                     });
    //                     return;
    //                 }
    //                 else {
    //                     res.send({
    //                         schedule: 2,
    //                     });
    //                     return;
    //                 }
    //             });
    //         }
    //     });
    // } catch (err) {
    //     res.send({
    //         schedule: -1
    //     });
    //     return;
    // }
});

app.post('/download', (req, res) => {
    const name = req.body.name;
    const downpath = `${downloadDir}/${name}.zip`;
    // console.log(name)
    res.download(downpath)
})


const zip_file = function zip_file(name) {
    const output = fs.createWriteStream(__dirname + "/download/" + name + '.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });// 设置压缩等级

    archive.pipe(output);
    archive.directory('./download/' + name + '/', false);
    archive.finalize();
}
//自动生成文件名
// app.post('/uploadbed',async (req,res)=>{
//     try{
//         let {files} = await multiparty_upload(req,true);
//         let file = (files.file && files.file[0]) || {};
//         res.send({
//             code:0,
//             codeText:'upload success',
//             originalFilename:file.originalFilename,
//             servicePath : file.path.replace(__dirname,HOSTNAME)
//         })
//     } catch(err){
//         res.send({
//             code :1,
//             codeText:err
//         })
//     }
// })


app.post('/uploadbed', async (req, res) => {
    try {
        let {
            fields,
            files
        } = await multiparty_upload(req);
        // let  HASH = files.filename;
        let file = (files.file && files.file[0]) || {},
            filename = (fields.filename && fields.filename[0]) || "",
            [, HASH] = /^([^_]+)_(\d+)/.exec(filename),
            path = `${uploadDir}/${HASH}/${HASH}.bed`;
        // isExists = false;
        // console.log(HASH)
        // // 检测是否存在
        // isExists = await exists(path);
        // if (isExists) {
        //     res.send({
        //         code: 0,
        //         codeText: 'file is exists',
        //         originalFilename: filename,
        //         servicePath: path.replace(__dirname, HOSTNAME)
        //     });
        //     return;
        // }
        writeFile(res, path, file, filename, true);
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }

})

const uploadDir = `${__dirname}/upload`;
const multiparty_upload = function multiparty_upload(req, auto) {
    typeof auto !== 'boolean' ? auto = false : null;
    let config = {
        maxFieldsSize: 2000 * 1024 * 1024,
    };
    // if (auto) config.uploadDir = `${uploadDir}/${req.body.HASH}`;
    // console.log(config)
    return new Promise(async (resolve, reject) => {
        new multiparty.Form(config)
            .parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({
                    fields,
                    files //客户端传过来的文件对象
                });
            });
    });
};

const writeFile = function writeFile(res, path, file, filename, stream) {
    return new Promise((resolve, reject) => {
        if (stream) {
            try {
                let readStream = fs.createReadStream(file.path),
                    writeStream = fs.createWriteStream(path);
                readStream.pipe(writeStream);
                readStream.on('end', () => {
                    resolve();
                    fs.unlinkSync(file.path);
                    res.send({
                        code: 0,
                        codeText: 'upload success',
                        originalFilename: filename,
                        servicePath: path.replace(__dirname, HOSTNAME)
                    });
                });
            } catch (err) {
                reject(err);
                res.send({
                    code: 2,
                    codeText: err
                });
            }
            return;
        }
        fs.writeFile(path, file, err => {
            if (err) {
                reject(err);
                res.send({
                    code: 1,
                    codeText: err
                });
                return;
            }
            resolve();
            res.send({
                code: 0,
                codeText: 'upload success',
                originalFilename: filename,
                servicePath: path.replace(__dirname, HOSTNAME)
            });
        });
    });
};


// 大文件切片上传 & 合并切片
const merge = function merge(HASH, count, savename) {
    return new Promise(async (resolve, reject) => {
        let path = `${uploadDir}/${HASH}/${HASH}`,
            fileList = [],
            suffix,
            isExists;
        isExists = await exists(path);
        if (!isExists) {
            reject('HASH path is not found!');
            return;
        }
        fileList = fs.readdirSync(path);
        if (fileList.length < count) {
            reject('the slice has not been uploaded!');
            return;
        }
        fileList.sort((a, b) => {
            let reg = /_(\d+)/;
            return reg.exec(a)[1] - reg.exec(b)[1];
        }).forEach(item => {
            !suffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1] : null;
            fs.appendFileSync(`${uploadDir}/${HASH}/${HASH}.bam`, fs.readFileSync(`${path}/${item}`));
            fs.unlinkSync(`${path}/${item}`);
        });
        fs.rmdirSync(path);
        resolve({
            path: `${uploadDir}/${HASH}/${HASH}.${suffix}`,
            filename: `${HASH}.${suffix}`
        });
    });
};

app.post('/upload_chunk', async (req, res) => {
    try {
        let {
            fields,
            files
        } = await multiparty_upload(req);
        let file = (files.file && files.file[0]) || {},
            filename = (fields.filename && fields.filename[0]) || "",
            path = '';
        // isExists = false;
        // 创建存放切片的临时目录
        let [, HASH] = /^([^_]+)_(\d+)/.exec(filename);
        // console.log(HASH)
        path = `${uploadDir}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        path = `${uploadDir}/${HASH}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        // 把切片存储到临时目录中
        path = `${uploadDir}/${HASH}/${HASH}/${filename}`;
        // isExists = await exists(path);
        // if (isExists) {
        //     res.send({
        //         code: 0,
        //         codeText: 'file is exists',
        //         originalFilename: filename,
        //         servicePath: path.replace(__dirname, HOSTNAME)
        //     });
        //     return;
        // }
        writeFile(res, path, file, filename, true);
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }
});
app.post('/upload_merge', async (req, res) => {
    let {
        HASH,
        count,
        savename
    } = req.body;
    try {
        let {
            filename,
            path
        } = await merge(HASH, count, savename);
        res.send({
            code: 0,
            codeText: 'merge success',
            originalFilename: filename,
            servicePath: path.replace(__dirname, HOSTNAME)
        });
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }
});
app.get('/upload_already', async (req, res) => {
    let {
        HASH
    } = req.query;
    let path = `${uploadDir}/${HASH}`;
    !fs.existsSync(path) ? fs.mkdirSync(path) : null;
    path = `${uploadDir}/${HASH}/${HASH}`
    let fileList = [];
    try {
        fileList = fs.readdirSync(path);
        fileList = fileList.sort((a, b) => {
            let reg = /_(\d+)/;
            return reg.exec(a)[1] - reg.exec(b)[1];
        });
        res.send({
            code: 0,
            codeText: '',
            fileList: fileList
        });
    } catch (err) {
        res.send({
            code: 0,
            codeText: '',
            fileList: fileList
        });
    }
});


app.post('/queryuser', (req, res) => {
    let username = req.body.username;
    db.query(`select * from user where username=?`, [username], (err, results, fields) => {
        // console.log(results)
        if (err) throw err;
        if (results.length === 0) {
            res.send({
                errorNo: 404,
                errorMsg: 'No Data'
            });
            return;
        }
        res.send({
            errorNo: 0,
            data: results
        });
    })
})

app.post('/queryuserinfo', (req, res) => {
    let username = req.body.username;
    db.query(`select * from task where username=?`, [username], (err, results, fields) => {
        // console.log(results)
        if (err) throw err;
        if (results.length === 0) {
            res.send({
                errorNo: 404,
                errorMsg: 'No Data'
            });
            return;
        }
        res.send({
            errorNo: 0,
            data: results
        });
    })
})

app.post('/loadmotif', (req, res) => {
    console.log('loadmotif');
    const formval = req.body;
    const geonumber = formval.gse;
    const query = `SELECT * FROM new_gse_tf_human WHERE GEO_number = '${geonumber}' UNION SELECT * FROM gse_tf_mus_90 WHERE GEO_number = '${geonumber}'`; // 构造SQL查询语句
    // const db = pool.getConnection()
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const motifList = JSON.parse(results[0].motifList); // 获取所有的motif
        const motifNumber = results[0].motifNumber; // 获取motif的个数
        // const defaultImg = results.length > 0 ? results[0].img : null; // 获取默认的img
        // console.log(motifNumber,geonumber,results)
        const response = {
            motif_number: motifNumber,
            motif_list: motifList,
            // default_img: defaultImg,
        };
        res.send(response); // 发送响应
    });
})

app.post('/getppm', (req, res) => {
    const gse = req.body.gse
    const motif = req.body.motif
    // const conn = await pool.getConnection()
    // console.log('getimg'); 
    if (!gse || !motif) {
        res.status(400).send('Bad request')
        return
    }
    const ppmpath = path.join(__dirname, `ppm/${gse}/${motif}.json`)
    fs.readFile(ppmpath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('Internal server error')
        }
        const jsondata = JSON.parse(data);
        // console.log(jsondata);
        const response = {
            alphabet: jsondata["alphabet"],
            ppm: jsondata["ppm"],
            nsites:jsondata["nsites"]
        }
        res.send(response);
    })
})

app.post('/getimg', (req, res) => {
    const gse = req.body.gse
    const motif = req.body.motif
    // const conn = await pool.getConnection()
    // console.log('getimg'); 
    if (!gse || !motif) {
        res.status(400).send('Bad request')
        return
    }
    const imgUrl = path.join(__dirname, `img/${gse}_${motif}.png`)
    //   console.log(imgUrl)  
    res.sendFile(imgUrl, (err) => {
        if (err) {
            console.error(err)
            res.status(500).send('Internal server error')
        }
    })
    // const imgUrl = `${__dirname}/img/${gse}_${motif}.png` 
    // const imgData = fs.promises.readFile(imgUrl)
    // const stats = fs.promises.stat(imgUrl)
    // console.log(imgUrl) 
    // console.log(stats.size)  
    // res.writeHead(200, {
    // 'Content-Type': 'image/png',
    // 'Content-Length': stats.size
    // }) 
    // res.end(imgData, 'binary')
    // try {
    //     const [rows] = await db.query('SELECT * FROM motif_logo WHERE GEO_number = ? AND motif = ?', [gse, motif])
    //     if (rows.length === 0) {
    //       res.status(404).send('No image found.')
    //       return
    //     }
    //     const imgUrl = rows[0].img
    //     const imgData = await fs.promises.readFile(imgUrl)
    //     res.writeHead(200, {
    //       'Content-Type': 'image/png',
    //       'Content-Length': imgData.length
    //     })
    //     res.end(imgData, 'binary')
    //   } catch (error) {
    //     console.error(error)
    //     res.status(500).send('Internal server error.')
    //   }
    //  db.query('SELECT img FROM motif_logo WHERE GEO_number = ? AND motif = ?', [gse, motif],(err,results)=>{
    //         if (err) {
    //             console.log(err);
    //             res.status(500).send('Internal Server Error');
    //             return;
    //           }
    //           if (results.length === 0) {
    //             res.send({
    //                 errorNo: 404,
    //                 errorMsg: 'No Data'
    //             });
    //             return;
    //         }
    //         else {
    //             console.log(results[0].img) 
    //             const imgUrl = results[0].img
    //             const imgData = fs.promises.readFile(imgUrl)
    //             const stats = fs.promises.stat(imgUrl)
    //             console.log(stats.size) 
    //             res.writeHead(200, {
    //             'Content-Type': 'image/png',
    //             'Content-Length': stats.size
    //             }) 
    //             res.end(imgData, 'binary')
    //           }
    //     })
})

app.post('/upload_enrich', async (req, res) => {
    try {
        let {
            fields,
            files
        } = await multiparty_upload(req);
        // let  HASH = files.filename;
        let file = (files.file && files.file[0]) || {},
            filename = (fields.filename && fields.filename[0]) || "",
            HASH = (fields.hash && fields.hash[0]) || "";
            
        let path = `${uploadDir}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        path = `${uploadDir}/${HASH}/${filename}`;
        writeFile(res, path, file, filename, true);
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }

})

app.post("/motif_enrich", (req, res, next) => {
    const model = './ame/run.py',
        filename = req.body.name,
        username = req.body.username,
        hash=req.body.hash,
        task_content=req.body.task,
        species = req.body.species;

    console.log(filename, species, task_content, username,hash)
    let py6 = spawn('python', [model, filename, hash, species]);
    py6.stdout.on('data', function (data) {
        console.log('stdout: py6:' + data);
    })
    py6.stderr.on('data', (data) => {
        console.error(`错误输出：${data}`);
    });
    py6.on('close', function (code) {
        fs.access(`${downloadDir}/${hash}.zip`, fs.constants.F_OK, (err) => {
            if (err) {
                zip_file(hash)
            }
        });
        if (username) {
            console.log('insert start')
            db.query(`insert into task values (?,?,?,?,?)`, [hash, username, 'AME', species, task_content], (err, results, fields) => {
                if (err) throw err;
                else {
                    console.log('insert end')
                }
            })
        }
        let modeldel = './MMGraph/delete.py'
        let pydel = spawn('python', [modeldel, hash]);
        pydel.on('close', function (code) { res.send({
            code: 0,
            codeText: 'enrich complete',
        }); })
    })
                 

});

app.post('/upload_fun', async (req, res) => {
    try {
        let {
            fields,
            files
        } = await multiparty_upload(req);
        // let  HASH = files.filename;
        let file = (files.file && files.file[0]) || {},
            filename = (fields.filename && fields.filename[0]) || "",
            HASH = (fields.hash && fields.hash[0]) || "";
            
        let path = `${uploadDir}/${HASH}`;
        !fs.existsSync(path) ? fs.mkdirSync(path) : null;
        path = `${uploadDir}/${HASH}/${filename}`;
        writeFile(res, path, file, filename, true);
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }

})

app.post("/motif_fun", (req, res, next) => {
    const model = './gomo/run.py',
        filename = req.body.name,
        username = req.body.username,
        hash=req.body.hash,
        task_content=req.body.task,
        species = req.body.species;

    console.log(filename, species, task_content, username,hash)
    let py6 = spawn('python', [model, filename, hash, species]);
    py6.stdout.on('data', function (data) {
        console.log('stdout: py6:' + data);
    })
    py6.stderr.on('data', (data) => {
        console.error(`错误输出：${data}`);
    });
    py6.on('close', function (code) {
        fs.access(`${downloadDir}/${hash}.zip`, fs.constants.F_OK, (err) => {
            if (err) {
                zip_file(hash)
            }
        });
        if (username) {
            console.log('insert start')
            db.query(`insert into task values (?,?,?,?,?)`, [hash, username, 'AME', species, task_content], (err, results, fields) => {
                if (err) throw err;
                else {
                    console.log('insert end')
                }
            })
        }
        let modeldel = './MMGraph/delete.py'
        let pydel = spawn('python', [modeldel, hash]);
        pydel.on('close', function (code) { res.send({
            code: 0,
            codeText: 'enrich complete',
        }); })
    })
                 

});

app.post('/login', (req, res) => {
    let formval = req.body;
    let username = formval.username;
    let password = formval.password;
    // console.log(username,password)
    db.query(`select * from user where (username=? and password=?) or (email=? and password=?)`, [username, password, username, password], (err, results, fields) => {
        if (err) throw err;
        if (results.length === 0) {
            res.send({
                errorNo: 404,
                errorMsg: 'No Data'
            });
            return;
        }
        res.send({
            errorNo: 0,
            data: results
        });
    })
})
app.post('/modify', (req, res) => {
    let formval = req.body;
    let username = formval.username;
    let oldemail = formval.oldemail;
    let newemail = formval.newemail;
    // console.log(username,password)
    db.query(`select * from user where email=?`, [newemail], (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({
                errorNo: 401,
                errorMsg: 'Email already exists'
            });
            return;
        } else {
            db.query(`select * from user where (username=? and email=?)`, [username, oldemail], (err, results, fields) => {
                if (err) throw err;
                if (results.length === 0) {
                    res.send({
                        errorNo: 402,
                        errorMsg: 'No Data'
                    });
                    return;
                } else {
                    db.query(`update user set email=? where (username=? and email=?)`, [newemail, username, oldemail], (err, results, fields) => {
                        if (err) throw err;
                        res.send({
                            errorNo: 0,
                            data: results
                        });
                    })
                }
            })
        }
    })


})
app.post('/signup', (req, res) => {
    let formval = req.body;
    let username = formval.username;
    let password = formval.password;
    let email = formval.email;
    console.log(username, password, email)
    db.query(`select * from user where username=?`, [username], (err, results, fields) => {
        if (err) throw err;
        if (results.length !== 0) {
            res.send({
                errorNo: 401,
                errorMsg: 'The username has been registered'
            });
        }
        else {
            db.query(`select * from user where email=?`, [email], (err, results, fields) => {
                if (err) throw err;
                if (results.length !== 0) {
                    res.send({
                        errorNo: 402,
                        errorMsg: 'The email has been registered'
                    });
                }
                else {
                    db.query(`insert into user values (?,?,?,?)`, [username, password, 0, email], (err, results, fields) => {
                        if (err) throw err;
                        res.send({
                            errorNo: 0,
                            data: results
                        });
                    })
                }
            })
        }
    }
    )


})

app.post('/email', async (req, res) => {
    const name = req.body.name,
        mail = req.body.mail;
    try {
        console.log('send start')
        sendMail(mail, name);
        console.log('send end')
        res.send({
            code: 0,
            codeText: 'send success',
        });
    } catch (err) {
        res.send({
            code: 1,
            codeText: err
        });
    }
})


//email
let transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 第三方邮箱的主机地址
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mmgraph@163.com', // 发送方邮箱的账号
        pass: 'XIHQPBSDPOHOKTQN', // 邮箱授权密码
    },
});
function sendMail(mail, hash) {
    // 发送的配置项
    let mailOptions = {
        from: '"MMF-ATAC" <mmgraph@163.com>', // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎来到"MMF-ATAC"', // 标题
        text: 'Hello MMF-ATAC', // 文本内容
        html: '<p>这里是"MMF-ATAC"详情请点击:</p><a href="https://www.mmgraphws.com/">点击跳转</a>', //页面内容
        attachments: [{//发送文件
            // 		filename: 'index.html', //文件名字
            // 		path: './index.html' //文件路径
            // 	},
            // 	{
            // 		filename: 'sendEmail.js', //文件名字
            // 		content: 'sendEmail.js' //文件路径
            path: `./download/${hash}.zip`
        }
        ]
    };
    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('false')
        } else {
            console.log('true') //因为是异步 所有需要回调函数通知成功结果
        }
    });

}

// 使用async..await 创建执行函数
// async function email(mail, hash) {
//     // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
//     // let testAccount = await nodemailer.createTestAccount();

//     // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
//     let transporter = nodemailer.createTransport({
//         host: "smtp.163.com", // 第三方邮箱的主机地址
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'mmgraph@163.com', // 发送方邮箱的账号
//             pass: 'XIHQPBSDPOHOKTQN', // 邮箱授权密码
//         },
//     });

//     // 定义transport对象并发送邮件
//     let info = await transporter.sendMail({
//         from: '"MMGraph" <mmgraph@163.com>', // 发送方邮箱的账号
//         to: mail, // 邮箱接受者的账号
//         subject: "Welcome to use MMGraph", // Subject line
//         text: "Hello MMGraph", // 文本内容
//         html: `<p>这里是"MMGraph"详情请点击:</p><a href="${address}">点击跳转</a>`, // html 内容, 如果设置了html内容, 将忽略text内容
//         attachments: [
//             {
//                 path: `./download/${hash}.zip`
//             }
//         ]
//     });
// }



app.listen('8081', () => {
    console.log('Server is running on PORT 8081!');
})
