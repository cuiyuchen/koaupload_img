console.info('hello word');

const  Koa = require('koa');

const route = require('koa-route');

const fs = require('fs');

const koabody = require('koa-body');

const config = require('./config');


const app = new Koa();

app.use(koabody({multipart:true}));

app.use(async (ctx,next)=>{
	let start_time = new Date().getTime();
	await next();
	console.info(new Date().getTime() - start_time );
	console.info(ctx.method)
})

app.use(route.get('/cuizhenapi/about',(ctx,next)=>{
	console.info(ctx.query)
	ctx.response.body = 'cuizhen';
}))

const home= async function(ctx,next){
	fs.readFile('./view/index.html',function(err,data){
		console.info(data);
		ctx.response.body  = data;
	})
	//ctx .body = 'dsfjakl'

}



app.use(route.get('/cuizhenapi/home',async(ctx,next)=>{

	ctx.body= await new Promise((resolve,reject)=>{
		setTimeout(function(){
			resolve('cuizhen')
		},1000)
	})
	//ctx.response.body = await 
}))

console.info(__dirname)
app.use(route.post('/cuizhenapi/setfile',(ctx,next)=>{
	//console.info(ctx.request.body);
	var resdata = ctx.request.body.fields;
	var files = ctx.request.body.files;
	//console.info(resdata);
	//console.info(files);
	for(var i in files){
		var filename = files[i].name;
		var filepath = files[i].path;
		var filetype = files[i].type;
		if(filetype=='image/jpeg'){
			var reader = fs.createReadStream(filepath);
			var writer = fs.createWriteStream(__dirname+'/image/'+filename);
			reader.pipe(writer);
		}

	}
	ctx.body = '/myproduct/server/image/'+filename;
}))

app.use((ctx)=>{
	console.info(ctx.request.body);
	ctx.body = 'hello word'
})


app.listen(config.port,()=>{
	console.info('server start in '+ config.port);
});

console.info(__dirname)