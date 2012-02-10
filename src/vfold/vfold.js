/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var VFold;

define(

function() {

    var callbacks = [];
    var p = Class.prototype;

    function onWindowResize() {

        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    }

    function Class() {

        this.color = 0x232323;
    }


        p.addResizeCallback = function(func) {
            callbacks.push(func);
            
        }
        
        var c = Core;

        function Core() {}

        /****************************************************************
         * Core Components
         ****************************************************************/

        c.desktops;
        c.panels;
        c.folders;
        c.widgets;

        /****************************************************************
         * Event Constants
         ****************************************************************/

        c.WORKSPACE_CHANGE = "workspaceChange";
        c.WORKSPACE_ADD = "workspaceAdd";

        /****************************************************************
         * Rest of properties
         ****************************************************************/

        var intWorkspaceIndex;

        const dctLibraries ={};
        const vctWorkspaces=[];
        const eventDispatcher_ = new EventDispatcher();

        /*********************************
         * Core Options
         *********************************/
        var AES_KEY: String;
        var FACEBOOK_APP_ID: String;
        /*********************************
         * Secure Value Object for User
         *********************************/
        c.USER;
        /*********************************
         * Gateway Session and if is Root
         *********************************/
        c.HEADER;
        /**********************************
         * Gateway KEY for acceptable calls
         **********************************/
        var ROOT_ENCRYPTED;
        /*********************************
         * Net Connection Pool
         *********************************/
        const NET_POOL = new Pooling(NetConn);

        c.init = function(options, onReady): void {


            /***********************************************
             * Set Core Configuration Options
             ***********************************************/

            AES_KEY = options.aesKey;
            FACEBOOK_APP_ID = options.facebookAppID;
            ROOT_ENCRYPTED = encrypt(options.rootPassword, 128);

            HEADER = new VOHeader();
            HEADER.session = new VOSession();

            /*********************************************************************
             * INIT your session via this validation and authentication Function
             *********************************************************************/

            rootCall("Session.init", function(session: Object): void {
                var
                sov: VOSession = VOSession(session),
                    sobSES: SharedObject = SharedObject.getLocal("vfold_session", "/");

                HEADER.session.id = sobSES.data.id = sov.id;
                HEADER.session.code = sobSES.data.code = sov.code;
                sobSES.flush();
                onReady();
            },
            [HEADER.session, ROOT_ENCRYPTED]);

            Facebook.init(FACEBOOK_APP_ID, function(success: Object,
            failure: Object): void {
                onFacebookLogin(success, failure);
            });


        }
        c.startGUI = function(workspaces) {

            /*********************************************************
             * Init the the Secure Class for a session Request and
             * enable AMF calls to the gateway
             *********************************************************/

            panels = new PanelHandler();
            folders = new FolderHandler;
            desktops = new DesktopHandler();
            widgets = new WidgetHandler;

            for each(var work: VOWorkspace in workspaces) {
                var workspace: Workspace = new Workspace();
                workspace.title = work.title;
                for each(var comp: VOComponent in work.components) {
                    workspace.setComponent(new WorkspaceComponent(comp));
                    if (comp.type == VOComponent.FOLDER) {

                        var path: Array = comp.menu_path.split(".");

                        var parent: MenuOptions = workspace.menu;
                        var child: MenuOptions;

                        for (var i: int = 0;
                        i < path.length;
                        i++) {
                            child = parent.children[path[i]];
                            if (!child) {
                                child = new MenuOptions();
                                child.title = path[i];
                            }
                            if (i == path.length - 1) {
                                child.launch = comp.class_path;
                            }
                            parent.children[path[i]] = child;
                            parent = child;
                        }
                    }
                }
                vctWorkspaces.push(workspace);
                eventDispatcher_.dispatchEvent(new Event(WORKSPACE_ADD));
            }

            /************************************************
             * Check POST URL Parameters
             ************************************************/

            var pr: Object = VFOLD.stage.loaderInfo.parameters;
            if (pr.confirm) {
                rootCall("User.confirm", function(confirmed: Boolean): void {
                    if (confirmed) {
                        notify("Your account has been confirmed!\nNow you can sign-in");
                    }
                },
                pr.confirm);
            }

            /*********************************************************
             * Call javascript methods
             *********************************************************/

            UtilityJavascript.initMouseWheel(VFOLD.stage);
            UtilityJavascript.changeDocumentTitle(VFOLD.projectTitle + "-" + vctWorkspaces[0].title);

            widgets.init();
            folders.init();
            panels.init();

            panels.addTool(new UserTool());

            stage.addChild(desktops);
            stage.addChild(widgets);
            stage.addChild(folders);
            stage.addChild(panels);

            useWorkspace(0);

            //TODO: 2D/3D ACCELERATION /////////////////////////////////////////////////////
            VFOLD.stage.stage3Ds[0].addEventListener(Event.CONTEXT3D_CREATE, function(e: Event): void {
                notify(VFOLD.stage.stage3Ds[0].context3D.driverInfo);
            });
            VFOLD.stage.stage3Ds[0].requestContext3D();

            //////////////////////////////////////////////////////////////////////////////
            notify("Powered by vfold");
        }
        c.notify(...rest): void {

            var t: String = " ";
            for each(var s: * in rest) {
                t += String(s) + " ";
            }
            widgets.notifier.notify(t);
        }
        c.useWorkspace(index: uint): void {

            intWorkspaceIndex = index;
            dispatcher.dispatchEvent(new Event(WORKSPACE_CHANGE));
        }

        c.get desktopHandler(): DesktopHandler {
            return desktops
        }
        c.get panelHandler(): PanelHandler {
            return panels
        }
        c.get folderHandler(): FolderHandler {
            return folders
        }
        c.get widgetHandler(): WidgetHandler {
            return widgets
        }

        c.get dispatcher(): EventDispatcher {
            return eventDispatcher_
        }
        c.get currentWorkspace(): Workspace {
            return vctWorkspaces[intWorkspaceIndex]
        }
        c.get defaultWorkspace(): Workspace {
            return vctWorkspaces[0]
        }
        c.get currentWorkspaceIndex(): uint {
            return intWorkspaceIndex
        }
        c.get currentUser(): VOUser {
            return USER
        }

        c.get libraries(): Dictionary {
            return dctLibraries
        }

        c.appCall(command: String,
        onSuccess: Function,
        params: Array = null,
        onError: Function = null): void {

            getConnection(onSuccess, onError).amfCall(command, params, false);
        }
        c.rootCall(command: String,
        onSuccess: Function,
        params: Array = null,
        onError: Function = null): void {

            getConnection(onSuccess, onError).amfCall(command, params, true);
        }

        function getConnection(onSuccess: Function,
        onError: Function): NetConn {

            var conn: NetConn = NetConn(NET_POOL.getObject());

            if (NET_POOL.instantiated) {
                conn.onClose = function(conn: NetConn): void {
                    NET_POOL.returnToPool(conn)
                }
            }

            conn.onSuccess = onSuccess;
            conn.onError = onError;

            return conn;
        }

        c.getExternalClass(srcAppDomain: ApplicationDomain,
        library: String,
        classPath: String): Object {

            var tgtAppDomain: ApplicationDomain = ApplicationDomain(dctLibraries[library]);
            if (!tgtAppDomain) {
                return null;
            }
            if (!tgtAppDomain.hasDefinition(classPath)) {
                return null;
            }
            return tgtAppDomain.getDefinition(classPath)
        }
        c.checkRootPassword(password: String): Boolean {
            return AES_KEY == decrypt(ROOT_ENCRYPTED, password, 128);
        }
        c.signInFacebook(): void {
            Facebook.login(onFacebookLogin, {
                perms: "user_about_me, user_birthday, email, publish_stream, offline_access"
            });
        }
        c.onFacebookLogin(success: Object,
        fail: Object): void {
            var m: String;
/* if(success){
Facebook.api("/me",
function(success:Object,failure:Object):void{
amfCall("Account.getAccountByFID",function(acc:UserPrivate):void{
if(acc){
USR=acc;
Core.dispatcher.dispatchEvent(new Event(Core.USER_CHANGE));
m="Welcome back "+USR.first_name+"!";
}
else{
acc = new UserPrivate();
acc.first_name=success.first_name;
acc.last_name=success.last_name;
acc.facebook_id=success.id;
acc.email=success.email;
acc.gender=success.male;
acc.birthday=success.birthday;
m="Registering Facebook account...";
amfCall("User.add",function():void{

},acc)
}
Core.notify(m);
},success.id)
});
}
else{

} */
        }
        c.signInUser(email: String,
        password: String,
        callback: Function): void {

            var strNTF: String;
            rootCall("User.getOneBy",

            function(response: Object): void {
                trace(response.role_value);
                if (response.role_value == UserRole.GUEST) {
                    callback(false);
                    Core.notify("User has not yet been confirmed..Check your email");
                }
                else {
                    rootCall("User.get", function(user: VOUserSecure): void {
                        if (AES_KEY == decrypt(user.password, password)) {
                            USER = user;
                            Core.dispatcher.dispatchEvent(new Event(VFOLD.USER_CHANGE));
                            callback(true);
                            strNTF = "Welcome back " + USER.first_name + "!";
                        }
                        else {
                            callback(false);
                            strNTF = "Wrong password, try again";
                        }
                        Core.notify(strNTF);
                    },
                    response.id);
                }
            },
            [{
                email: email
            }, ["role_value", "id"]],

            function(errorCode: int): void {
                if (errorCode == ErrorUser.NOT_FOUND) Core.notify("Wrong email,try again");
            });
        }
        /************************************************
         * AES Encryption
         ************************************************/
        c.encrypt(password: String,
        bitKey: int = 256): String {
            return UtilityCryptography.encrypt(AES_KEY, password, bitKey);
        }
        /************************************************
         * AES Decryption
         ************************************************/
        c.decrypt(encrypted: String,
        password: String,
        bitKey: int = 256): String {
            return UtilityCryptography.decrypt(encrypted, password, bitKey);
        }
    }
}
};

window.onresize = onWindowResize;

VFold = Class;
});