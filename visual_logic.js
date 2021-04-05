/**
 * Generated by Verge3D Puzzles v.3.6.1
 * Sun Apr 04 2021 15:45:07 GMT+0200 (Eastern European Standard Time)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

'use strict';

(function() {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.objClickInfo = [];
_pGlob.pickedObject = '';
_pGlob.objHoverInfo = [];
_pGlob.hoveredObject = '';
_pGlob.objMovementInfos = {};
_pGlob.objDragOverCallbacks = [];
_pGlob.objDragOverInfoByBlock = {}
_pGlob.dragMoveOrigins = {};
_pGlob.dragScaleOrigins = {};
_pGlob.mediaElements = {};
_pGlob.loadedFiles = {};
_pGlob.loadedFile = '';
_pGlob.promiseValue = '';
_pGlob.animMixerCallbacks = [];
_pGlob.arHitPoint = new v3d.Vector3(0, 0, 0);
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.animateParamUpdate = null;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.gamepadIndex = 0;

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();
_pGlob.intervals = {};

var _pPhysics = {};

_pPhysics.tickCallbacks = [];
_pPhysics.syncList = [];
_pPhysics.consList = [];

// internal info
_pPhysics.collisionData = [];

// goes to collision callback
_pPhysics.collisionInfo = {
    objectA: '',
    objectB: '',
    distance: 0,
    positionOnA: [0, 0, 0],
    positionOnB: [0, 0, 0],
    normalOnB: [0, 0, 0]
};

var _noWebAudioReported = false;
var _webAudioTinySynth = null;

var PL = v3d.PL = v3d.PL || {};

// a more readable alias for PL (stands for "Puzzle Logic")
v3d.puzzles = PL;

PL.procedures = PL.procedures || {};



PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    var PROC = {
    
};


    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}



var PROC = {
    
};

var height, width, standard, standard2, width2, width3, width4, width5, height2, height3, height4, height5;



// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return (obj.type !== "AmbientLight" && obj.name !== ""
            && !(obj.isMesh && obj.isMaterialGeneratedMesh));
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            if (runTime) {
                _pGlob.objCache[objName] = objFound;
            }
        }
    });
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc;
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}




// show and hide puzzles
function changeVis(objNames, bool) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i]
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        obj.visible = bool;
    }
}




/**
 * Retrieve coordinate system from the loaded scene
 */
function getCoordSystem() {
    var scene = appInstance.scene;

    if (scene && "v3d" in scene.userData && "coordSystem" in scene.userData.v3d) {
        return scene.userData.v3d.coordSystem;
    } else {
        // COMPAT: <2.17, consider replacing to 'Y_UP_RIGHT' for scenes with unknown origin
        return 'Z_UP_RIGHT';
    }
}


/**
 * Transform coordinates from one space to another
 * Can be used with Vector3 or Euler.
 */
function coordsTransform(coords, from, to, noSignChange) {

    if (from == to)
        return coords;

    var y = coords.y, z = coords.z;

    if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
        coords.y = z;
        coords.z = noSignChange ? y : -y;
    } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
        coords.y = noSignChange ? z : -z;
        coords.z = y;
    } else {
        console.error('coordsTransform: Unsupported coordinate space');
    }

    return coords;
}


/**
 * Verge3D euler rotation to Blender/Max shortest.
 * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
 *    order) via reversion: XYZ -> ZYX
 * 2) swizzle ZYX->YZX
 * 3) choose the shortest rotation to resemble Blender's behavior
 */
var eulerV3DToBlenderShortest = function() {

    var eulerTmp = new v3d.Euler();
    var eulerTmp2 = new v3d.Euler();
    var vec3Tmp = new v3d.Vector3();

    return function(euler, dest) {

        var eulerBlender = eulerTmp.copy(euler).reorder('YZX');
        var eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

        var len = eulerBlender.toVector3(vec3Tmp).lengthSq();
        var lenAlt = eulerBlenderAlt.toVector3(vec3Tmp).lengthSq();

        dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
        return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
    }

}();




function RotationInterface() {
    /**
     * For user manipulations use XYZ extrinsic rotations (which
     * are the same as ZYX intrinsic rotations)
     *     - Blender/Max/Maya use extrinsic rotations in the UI
     *     - XYZ is the default option, but could be set from
     *       some order hint if exported
     */
    this._userRotation = new v3d.Euler(0, 0, 0, 'ZYX');
    this._actualRotation = new v3d.Euler();
}

Object.assign(RotationInterface, {
    initObject: function(obj) {
        if (obj.userData.v3d.puzzles === undefined) {
            obj.userData.v3d.puzzles = {}
        }
        if (obj.userData.v3d.puzzles.rotationInterface === undefined) {
            obj.userData.v3d.puzzles.rotationInterface = new RotationInterface();
        }

        var rotUI = obj.userData.v3d.puzzles.rotationInterface;
        rotUI.updateFromObject(obj);
        return rotUI;
    }
});

Object.assign(RotationInterface.prototype, {

    updateFromObject: function(obj) {
        var SYNC_ROT_EPS = 1e-8;

        if (!this._actualRotation.equalsEps(obj.rotation, SYNC_ROT_EPS)) {
            this._actualRotation.copy(obj.rotation);
            this._updateUserRotFromActualRot();
        }
    },

    getActualRotation: function(euler) {
        return euler.copy(this._actualRotation);
    },

    setUserRotation: function(euler) {
        // don't copy the order, since it's fixed to ZYX for now
        this._userRotation.set(euler.x, euler.y, euler.z);
        this._updateActualRotFromUserRot();
    },

    getUserRotation: function(euler) {
        return euler.copy(this._userRotation);
    },

    _updateUserRotFromActualRot: function() {
        var order = this._userRotation.order;
        this._userRotation.copy(this._actualRotation).reorder(order);
    },

    _updateActualRotFromUserRot: function() {
        var order = this._actualRotation.order;
        this._actualRotation.copy(this._userRotation).reorder(order);
    }

});




// setObjTransform puzzle
function setObjTransform(objNames, mode, x, y, z, offset) {

    objNames = retrieveObjectNames(objNames);
    if (!objNames) return;

    function setObjProp(obj, prop, val) {
        if (!offset) {
            obj[mode][prop] = val;
        } else {
            if (mode != "scale")
                obj[mode][prop] += val;
            else
                obj[mode][prop] *= val;
        }
    }

    var inputsUsed = _pGlob.vec3Tmp.set(Number(x !== ''), Number(y !== ''),
            Number(z !== ''));
    var coords = _pGlob.vec3Tmp2.set(x || 0, y || 0, z || 0);

    if (mode === 'rotation') {
        // rotations are specified in degrees
        coords.multiplyScalar(v3d.Math.DEG2RAD);
    }

    var coordSystem = getCoordSystem();

    coordsTransform(inputsUsed, coordSystem, 'Y_UP_RIGHT', true);
    coordsTransform(coords, coordSystem, 'Y_UP_RIGHT', mode === 'scale');

    for (var i = 0; i < objNames.length; i++) {

        var objName = objNames[i];
        if (!objName) continue;

        var obj = getObjectByName(objName);
        if (!obj) continue;

        if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
            // Blender/Max coordinates

            // need all the rotations for order conversions, especially if some
            // inputs are not specified
            var euler = eulerV3DToBlenderShortest(obj.rotation, _pGlob.eulerTmp);
            coordsTransform(euler, coordSystem, 'Y_UP_RIGHT');

            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            /**
             * convert from Blender/Max default XYZ extrinsic order to v3d XYZ
             * intrinsic with reversion (XYZ -> ZYX) and axes swizzling (ZYX -> YZX)
             */
            euler.order = "YZX";
            euler.reorder(obj.rotation.order);
            obj.rotation.copy(euler);

        } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
            // Maya coordinates

            // Use separate rotation interface to fix ambiguous rotations for Maya,
            // might as well do the same for Blender/Max.

            var rotUI = RotationInterface.initObject(obj);
            var euler = rotUI.getUserRotation(_pGlob.eulerTmp);
            // TODO(ivan): this probably needs some reasonable wrapping
            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            rotUI.setUserRotation(euler);
            rotUI.getActualRotation(obj.rotation);
        } else {

            if (inputsUsed.x) setObjProp(obj, "x", coords.x);
            if (inputsUsed.y) setObjProp(obj, "y", coords.y);
            if (inputsUsed.z) setObjProp(obj, "z", coords.z);

        }

        obj.updateMatrixWorld(true);
    }

}



// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem.addEventListener(eventType, callback, false);
    }
}



/**
 * Obtain a unique name from the given one. Names are tested with the given
 * callback function that should return a boolean "unique" flag. If the given
 * "name" is not considered unique, then "name2" is tested for uniqueness, then
 * "name3" and so on...
 */
function acquireUniqueName(name, isUniqueCb) {
    var uniqueName = name;

    if (isUniqueCb !== undefined) {
        while (!isUniqueCb(uniqueName)) {
            var r = uniqueName.match(/^(.*?)(\d+)$/);
            if (!r) {
                uniqueName += "2";
            } else {
                uniqueName = r[1] + (parseInt(r[2], 10) + 1);
            }
        }
    }

    return uniqueName;
}



/**
 * Check if the given material name is already used by materials on the scene.
 */
function matNameUsed(name) {
    return v3d.SceneUtils.getMaterialByName(appInstance, name) !== null;
}



// assignMaterial puzzle
function assignMat(objNames, matName) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames || !matName)
        return;
    var mat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
    if (!mat)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (obj) {
            var firstSubmesh = obj.resolveMultiMaterial()[0];

            var hasSkinning = firstSubmesh.isSkinnedMesh;
            var influences = firstSubmesh.morphTargetInfluences;
            var hasMorphing = influences !== undefined && influences.length > 0;

            if (hasSkinning || hasMorphing) {
                var newMat = mat.clone();
                newMat.name = acquireUniqueName(mat.name, function(name) {
                    return !matNameUsed(name);
                });

                if (hasSkinning) {
                    newMat.skinning = true;
                }

                if (hasMorphing) {
                    newMat.morphTargets = true;
                    if (firstSubmesh.geometry.morphAttributes.normal !== undefined) {
                        newMat.morphNormals = true;
                    }
                }

                firstSubmesh.material = newMat;
            } else {
                firstSubmesh.material = mat;
            }
        }
    }
}



// getHTMLElemAttribute puzzle
function getHTMLElemAttribute(attr, id, isParent) {
    var elem = getElement(id, isParent);
    return elem ? elem[attr]: '';
}



// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if (attr === 'style') {
            // NOTE: setting an attribute 'style' instead of a property 'style'
            // fixes IE11 worng behavior
            elem.setAttribute(attr, value);
        } else {
            elem[attr] = value;
        }
    }
}



// applyObjLocalTransform puzzle
function applyObjLocalTransform(objNames, mode, x, y, z) {

    objNames = retrieveObjectNames(objNames);
    if (!objNames) return;

    var defValue = mode == "scale" ? 1 : 0;
    if (typeof x != "number") x = defValue;
    if (typeof y != "number") y = defValue;
    if (typeof z != "number") z = defValue;

    var coords = coordsTransform(_pGlob.vec3Tmp.set(x, y, z), getCoordSystem(), 'Y_UP_RIGHT', mode == 'scale');

    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName) continue;

        var obj = getObjectByName(objName);
        if (!obj) continue;

        // don't transform values for cameras, their local space happens
        // to be the same as for Blender/Max cameras, bcz their different
        // rest orientation balances difference in coordinate systems
        var useTransformed = !obj.isCamera;
        var xVal = useTransformed ? coords.x : x;
        var yVal = useTransformed ? coords.y : y;
        var zVal = useTransformed ? coords.z : z;

        switch (mode) {
        case "position":
            if (_pGlob.xrSessionAcquired && obj.isCamera) {
                v3d.WebXRUtils.translateVRCamera(obj, _pGlob.AXIS_X, xVal);
                v3d.WebXRUtils.translateVRCamera(obj, _pGlob.AXIS_Y, yVal);
                v3d.WebXRUtils.translateVRCamera(obj, _pGlob.AXIS_Z, zVal);
            } else {
                obj.translateX(xVal);
                obj.translateY(yVal);
                obj.translateZ(zVal);
            }
            break;
        case "rotation":
            if (_pGlob.xrSessionAcquired && obj.isCamera) {
                v3d.WebXRUtils.rotateVRCamera(obj, _pGlob.AXIS_X, v3d.Math.degToRad(xVal));
                v3d.WebXRUtils.rotateVRCamera(obj, _pGlob.AXIS_Y, v3d.Math.degToRad(yVal));
                v3d.WebXRUtils.rotateVRCamera(obj, _pGlob.AXIS_Z, v3d.Math.degToRad(zVal));
            } else {
                obj.rotateX(v3d.Math.degToRad(xVal));
                obj.rotateY(v3d.Math.degToRad(yVal));
                obj.rotateZ(v3d.Math.degToRad(zVal));
            }
            break;
        case "scale":
            obj.scale.x *= xVal;
            obj.scale.y *= yVal;
            obj.scale.z *= zVal;
            break;
        }

        obj.updateMatrixWorld(true);
    }
}



// updateTextObject puzzle
function updateTextObj(objNames, text) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName) continue;
        var obj = getObjectByName(objName);
        if (!obj || !obj.geometry || !obj.geometry.cloneWithText)
            continue;
        obj.geometry = obj.geometry.cloneWithText(String(text));
    }
}



// utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
function initObjectPicking(callback, eventType, mouseDownUseTouchStart, mouseButtons) {

    var elem = appInstance.renderer.domElement;
    elem.addEventListener(eventType, pickListener);

    if (eventType == 'mousedown') {

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        elem.addEventListener(touchEventName, pickListener);

    } else if (eventType == 'dblclick') {

        var prevTapTime = 0;

        function doubleTapCallback(event) {

            var now = new Date().getTime();
            var timesince = now - prevTapTime;

            if (timesince < 600 && timesince > 0) {

                pickListener(event);
                prevTapTime = 0;
                return;

            }

            prevTapTime = new Date().getTime();
        }

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        elem.addEventListener(touchEventName, doubleTapCallback);
    }

    var raycaster = new v3d.Raycaster();

    function pickListener(event) {
        event.preventDefault();

        var xNorm = 0, yNorm = 0;
        if (event instanceof MouseEvent) {
            if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                return;
            xNorm = event.offsetX / elem.clientWidth;
            yNorm = event.offsetY / elem.clientHeight;
        } else if (event instanceof TouchEvent) {
            var rect = elem.getBoundingClientRect();
            xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
            yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
        }

        _pGlob.screenCoords.x = xNorm * 2 - 1;
        _pGlob.screenCoords.y = -yNorm * 2 + 1;
        raycaster.setFromCamera(_pGlob.screenCoords, appInstance.camera);
        var objList = [];
        appInstance.scene.traverse(function(obj){objList.push(obj);});
        var intersects = raycaster.intersectObjects(objList);
        callback(intersects, event);
    }
}

function objectsIncludeObj(objNames, testedObjName) {
    if (!testedObjName) return false;

    for (var i = 0; i < objNames.length; i++) {
        if (testedObjName == objNames[i]) {
            return true;
        } else {
            // also check children which are auto-generated for multi-material objects
            var obj = getObjectByName(objNames[i]);
            if (obj && obj.type == "Group") {
                for (var j = 0; j < obj.children.length; j++) {
                    if (testedObjName == obj.children[j].name) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
function getPickedObjectName(obj) {
    // auto-generated from a multi-material object, use parent name instead
    if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
        return obj.parent.name;
    } else {
        return obj.name;
    }
}



// whenClicked puzzle
function registerOnClick(objNames, xRay, doubleClick, mouseButtons, cbDo, cbIfMissedDo) {
    objNames = retrieveObjectNames(objNames) || [];

    var objNamesFiltered = objNames.filter(function(name) {
        return name;
    });

    // for AR/VR
    _pGlob.objClickInfo.push({
        objNames: objNamesFiltered,
        callbacks: [cbDo, cbIfMissedDo]
    });

    initObjectPicking(function(intersects, event) {

        var isPicked = false;

        var maxIntersects = xRay ? intersects.length : Math.min(1, intersects.length);

        for (var i = 0; i < maxIntersects; i++) {
            var obj = intersects[i].object;
            var objName = getPickedObjectName(obj);

            if (objectsIncludeObj(objNamesFiltered, objName)) {
                // save the object for the pickedObject block
                _pGlob.pickedObject = objName;
                isPicked = true;
                cbDo(event);
            }

        }

        if (!isPicked) {
            _pGlob.pickedObject = '';
            cbIfMissedDo(event);
        }

    }, doubleClick ? 'dblclick' : 'mousedown', false, mouseButtons);
}



changeVis('defaultMaterial', false);
changeVis('Mesh_0', true);
standard = 180;
standard2 = 80;
eventHTMLElem('click', 'btn-model-2', true, function(event) {
  changeVis('Mesh_0', false);
  changeVis('defaultMaterial', true);
  setObjTransform('Camera', 'position', 3, -8, 1, true);
});
eventHTMLElem('click', 'btn-model-1', true, function(event) {
  changeVis('defaultMaterial', false);
  changeVis('Mesh_0', true);
  setObjTransform('Camera', 'position', -3, 8, 1, true);
});
eventHTMLElem('click', 'btn-color-red', true, function(event) {
  assignMat('Mesh_0', 'Material.030');
  assignMat('defaultMaterial', 'Material.030');
});
eventHTMLElem('click', 'btn-color-green', true, function(event) {
  assignMat('Mesh_0', 'Material.040');
  assignMat('defaultMaterial', 'Material.040');
});
eventHTMLElem('click', 'btn-color-blue', true, function(event) {
  assignMat('Mesh_0', 'Material.041');
  assignMat('defaultMaterial', 'Material.041');
});
eventHTMLElem('click', 'btn-color-white', true, function(event) {
  assignMat('Mesh_0', 'Material.038');
  assignMat('defaultMaterial', 'Material.038');
});
eventHTMLElem('click', 'btn-color-black', true, function(event) {
  assignMat('Mesh_0', 'Material.042');
  assignMat('defaultMaterial', 'Material.042');
});
eventHTMLElem('change', 'width', true, function(event) {
  width2 = getHTMLElemAttribute('value', 'width', true);
  width3 = width2 - standard;
  width4 = width3 / 100;
  width5 = width4 + 1;
  standard = width2;
  setObjTransform('Mesh_0', 'scale', 1, 1, width5, true);
});
eventHTMLElem('click', 'width-more', true, function(event) {
  width2 = 1 + standard;
  setHTMLElemAttribute('value', width2, 'width', true);
  width3 = width2 - standard;
  width4 = width3 / 100;
  width5 = width4 + 1;
  standard = width2;
  setObjTransform('Mesh_0', 'scale', 1, 1, width5, true);
});
eventHTMLElem('click', 'width-less', true, function(event) {
  width2 = standard - 1;
  setHTMLElemAttribute('value', width2, 'width', true);
  width3 = width2 - standard;
  width4 = width3 / 100;
  width5 = width4 + 1;
  standard = width2;
  setObjTransform('Mesh_0', 'scale', 1, 1, width5, true);
});
eventHTMLElem('change', 'height', true, function(event) {
  height2 = getHTMLElemAttribute('value', 'height', true);
  height3 = height2 - standard2;
  height4 = height3 / 100;
  height5 = height4 + 1;
  standard2 = height2;
  setObjTransform('Mesh_0', 'scale', 1, height5, 1, true);
  console.log(height5);
  if (height5 > 1) {
    applyObjLocalTransform('Mesh_0', 'position', 0, -0.01, 0);
    console.log('Hello, Verge!');
  } else {
    applyObjLocalTransform('Mesh_0', 'position', 0, 0.01, 0);
    console.log('Hello, Verge2!');
  }
});
eventHTMLElem('click', 'height-more', true, function(event) {
  height2 = 1 + standard2;
  setHTMLElemAttribute('value', height2, 'height', true);
  height3 = height2 - standard2;
  height4 = height3 / 100;
  height5 = height4 + 1;
  standard2 = height2;
  setObjTransform('Mesh_0', 'scale', 1, height5, 1, true);
  applyObjLocalTransform('Mesh_0', 'position', 0, -0.01, 0);
});
eventHTMLElem('click', 'height-less', true, function(event) {
  height2 = standard2 - 1;
  setHTMLElemAttribute('value', height2, 'height', true);
  height3 = height2 - standard2;
  height4 = height3 / 100;
  height5 = height4 + 1;
  standard2 = height2;
  setObjTransform('Mesh_0', 'scale', 1, height5, 1, true);
  applyObjLocalTransform('Mesh_0', 'position', 0, 0.01, 0);
});

1;

height = 50;
width = 200;
registerOnClick('width_positive', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1, 1.01, true);
  width = width + 1;
  updateTextObj('width_value', width);
}, function() {});
registerOnClick('width_positive_sign', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1, 1.01, true);
  width = width + 1;
  updateTextObj('width_value', width);
}, function() {});
registerOnClick('width_negative', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1, 0.99, true);
  width = width - 1;
  updateTextObj('width_value', width);
}, function() {});
registerOnClick('width_negative_sign', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1, 0.99, true);
  width = width - 1;
  updateTextObj('width_value', width);
}, function() {});
registerOnClick('height_positive', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1.01, 1, true);
  height = height + 1;
  applyObjLocalTransform('Mesh_0', 'position', 0, -0.01, 0);
  updateTextObj('height_value', height);
}, function() {});
registerOnClick('height_positive_sign', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 1.01, 1, true);
  height = height + 1;
  applyObjLocalTransform('Mesh_0', 'position', 0, -0.01, 0);
  updateTextObj('height_value', height);
}, function() {});
registerOnClick('height_negative', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 0.99, 1, true);
  height = height - 1;
  applyObjLocalTransform('Mesh_0', 'position', 0, 0.01, 0);
  updateTextObj('height_value', height);
}, function() {});
registerOnClick('height_negative_sign', false, false, [0,1,2], function() {
  setObjTransform('Mesh_0', 'scale', 1, 0.99, 1, true);
  height = height - 1;
  applyObjLocalTransform('Mesh_0', 'position', 0, 0.01, 0);
  updateTextObj('height_value', height);
}, function() {});
registerOnClick('color_red', false, false, [0,1,2], function() {
  assignMat('Mesh_0', 'Material.002');
}, function() {});
registerOnClick('color_green', false, false, [0,1,2], function() {
  assignMat('Mesh_0', 'Material.003');
}, function() {});
registerOnClick('color_blue', false, false, [0,1,2], function() {
  assignMat('Mesh_0', 'Material.004');
}, function() {});
registerOnClick('color_white', false, false, [0,1,2], function() {
  assignMat('Mesh_0', 'Material.005');
}, function() {});
registerOnClick('color_black', false, false, [0,1,2], function() {
  assignMat('Mesh_0', 'Material.006');
}, function() {});



} // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */
