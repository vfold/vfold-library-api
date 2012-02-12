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

    
    var p = Class.prototype,c=p.constructor;

    function Class() {

        this.color = 0x232323;
    }

    c.PANEL_HEIGHT=50;

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

    const dctLibraries = {};
    const vctWorkspaces = [];
    var eventDispatcher_;

    /*********************************
     * Core Options
     *********************************/
    var AES_KEY;
    var FACEBOOK_APP_ID;
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
    var NET_POOL;

    function Core() {

        eventDispatcher_ = new EventDispatcher();
        NET_POOL = new Pooling(NetConn);
    }

    c.init = function(options, onReady) {


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

        rootCall("Session.init", function(session) {
            var
            sov = session,
                sobSES = SharedObject.getLocal("vfold_session", "/");

            HEADER.session.id = sobSES.data.id = sov.id;
            HEADER.session.code = sobSES.data.code = sov.code;
            sobSES.flush();
            onReady();
        }, [HEADER.session, ROOT_ENCRYPTED]);

        Facebook.init(FACEBOOK_APP_ID, function(success, failure) {
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

        for (var work in workspaces) {
            var workspace = new Workspace();
            workspace.title = work.title;
            for (var comp in work.components) {
                workspace.setComponent(new WorkspaceComponent(comp));
                if (comp.type == VOComponent.FOLDER) {

                    var path = comp.menu_path.split(".");

                    var parent = workspace.menu;
                    var child;

                    for (var i = 0;
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

        var pr = VFOLD.stage.loaderInfo.parameters;
        if (pr.confirm) {
            rootCall("User.confirm", function(confirmed) {
                if (confirmed) {
                    notify("Your account has been confirmed!\nNow you can sign-in");
                }
            }, pr.confirm);
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

        notify("Powered by vfold");
    }
    c.notif = function() {

        var t = " ";
        for (var s in rest) {
            t += String(s) + " ";
        }
        widgets.notifier.notify(t);
    }
    c.useWorkspace = function(index) {

        intWorkspaceIndex = index;
        dispatcher.dispatchEvent(new Event(WORKSPACE_CHANGE));
    }

    c.getDesktopHandler = function() {
        return desktops
    }
    c.getPanelHandler = function() {
        return panels
    }
    c.getFolderHandler = function() {
        return folders
    }
    c.getWidgetHandler = function() {
        return widgets
    }

    c.getDispatcher = function() {
        return eventDispatcher_;
    }
    c.getCurrentWorkspace = function() {
        return vctWorkspaces[intWorkspaceIndex];
    }
    c.getDefaultWorkspace = function() {
        return vctWorkspaces[0];
    }
    c.getCurrentWorkspaceIndex = function() {
        return intWorkspaceIndex;
    }
    c.getCurrentUser = function() {
        return USER;
    }

    c.getLibraries = function() {
        return dctLibraries;
    }

    c.appCall = function(command, onSuccess, params, onError) {

        getConnection(onSuccess, onError).amfCall(command, params, false);
    }
    c.rootCall = function(command, onSuccess, params, onError) {

        getConnection(onSuccess, onError).amfCall(command, params, true);
    }

    function getConnection(onSuccess, onError) {

        var conn = NetConn(NET_POOL.getObject());

        if (NET_POOL.instantiated) {
            conn.onClose = function(conn) {
                NET_POOL.returnToPool(conn)
            }
        }

        conn.onSuccess = onSuccess;
        conn.onError = onError;

        return conn;
    }

    c.getExternalClass = function(srcAppDomain, library, classPath) {

        var tgtAppDomain = dctLibraries[library];
        if (!tgtAppDomain) {
            return null;
        }
        if (!tgtAppDomain.hasDefinition(classPath)) {
            return null;
        }
        return tgtAppDomain.getDefinition(classPath)
    }
    c.checkRootPassword = function(password) {
        return AES_KEY == decrypt(ROOT_ENCRYPTED, password, 128);
    }
    c.signInFacebook = function() {
        Facebook.login(onFacebookLogin, {
            perms: "user_about_me, user_birthday, email, publish_stream, offline_access"
        });
    }
    c.onFacebookLogin = function(success, fail) {
        var m;
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
    c.signInUser = function(email, password, callback) {

        var strNTF;
        rootCall("User.getOneBy",

        function(response) {
            trace(response.role_value);
            if (response.role_value == UserRole.GUEST) {
                callback(false);
                Core.notify("User has not yet been confirmed..Check your email");
            }
            else {
                rootCall("User.get", function(user) {
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
                }, response.id);
            }
        }, [{
            email: email
        }, ["role_value", "id"]],

        function(errorCode) {
            if (errorCode == ErrorUser.NOT_FOUND) Core.notify("Wrong email,try again");
        });
    }
    /************************************************
     * AES Encryption
     ************************************************/
    c.encrypt = function(password, bitKey) {
        return UtilityCryptography.encrypt(AES_KEY, password, bitKey ? bitKey : 256);
    }
    /************************************************
     * AES Decryption
     ************************************************/
    c.decrypt = function(encrypted, password, bitKey) {
        return UtilityCryptography.decrypt(encrypted, password, bitKey ? bitKey : 256);
    }
    VFold = Class;
});