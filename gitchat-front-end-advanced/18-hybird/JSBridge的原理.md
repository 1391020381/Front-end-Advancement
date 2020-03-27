* 在jsBridge的设计中,可以把前端看做RPC的客户端,把Native端看作RPC的服务端,从而jsBridge要实现的主要逻辑就出现了:`通信调用（Native与js通信） 和举办的解析` 可以把流程比作jsonp

# js调用 Native
* js调用Native的方式 主要有两种：注入 API和拦截 ulr scheme

* 注入API

* 注入API方式的主要原理是,通过 WebView提供的接口,向 js的Context（window） 中注入对象或者方法，让js调用时,直接执行相应的Native代码逻辑,达到js调用Native的目的



* ios UIWebView 

```
JSContext *context = [uiWebView valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"]

context[@"postBridgeMessage"] = ^(NSArray<NSArray *> *calls){
    // Native 逻辑
}


window.postBridgeMessage(message)

```

* WKWebView

```
@interface WKWebVIewVC ()<WKScriptMessageHandler>

@implementation WKWebVIewVC

- (void)viewDidLoad {
    [super viewDidLoad];

    WKWebViewConfiguration* configuration = [[WKWebViewConfiguration alloc] init];
    configuration.userContentController = [[WKUserContentController alloc] init];
    WKUserContentController *userCC = configuration.userContentController;
    // 注入对象，前端调用其方法时，Native 可以捕获到
    [userCC addScriptMessageHandler:self name:@"nativeBridge"];

    WKWebView wkWebView = [[WKWebView alloc] initWithFrame:self.view.frame configuration:configuration];

    // TODO 显示 WebView
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if ([message.name isEqualToString:@"nativeBridge"]) {
        NSLog(@"前端传递的数据 %@: ",message.body);
        // Native 逻辑
    }
}


// 前端调用

window.webkit.messageHandlers.nativeBridge.postMessage(message)

```


* 安卓

```

publicclassJavaScriptInterfaceDemoActivityextendsActivity{
private WebView Wv;

    @Override
    publicvoidonCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        Wv = (WebView)findViewById(R.id.webView);     
        final JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    	 

        Wv.getSettings().setJavaScriptEnabled(true);
        Wv.addJavascriptInterface(myJavaScriptInterface, "nativeBridge");

        // TODO 显示 WebView

    }

    publicclassJavaScriptInterface{
         Context mContext;

         JavaScriptInterface(Context c) {
             mContext = c;
         }

         publicvoidpostMessage(String webMessage){	    	
             // Native 逻辑
         }
     }
}

// 前端调用


window.nativeBridge.postMessage(message);

```


# Native 调用 js

* UIWebView WKWebView 安卓的WebView 都以组件的形式存在与View/Activity 直接调用相对应的API即可

* Native 调用 js 其实就是 执行拼接js字符串 从外部调用js中的方法,因此 js的 方法必须在全局的window上。 （闭包里面的方法,js自己也调用不了,更不用想Native调用）

* ios UIWebView 

```
result = [uiWebView stringByEvaluatingJavaScriptFromString:javascriptString]

```

* WKWebView

```

[wkWebView evaluateJavaScript:javaScriptString completionHandler:completionHandler];


```


* 安卓

```
webView.loadUrl("javascript:" + javaScriptString); // 4.4以前

webView.evaluateJavascript(javaScriptString, new ValueCallback<String>() {
    @Override
    publicvoidonReceiveValue(String value){

    }
});

```