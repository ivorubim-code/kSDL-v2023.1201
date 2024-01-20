var kSDL = {

  CONTAINER_IDENTIFIER: "",
  CONTAINER_APPEND_PLACE:{},

  GEN_ID:{ rnd: "", for_item: "" },

  LC:{ CLASS: "INI", ID: "INI", QSA: "INI" },
  ELEMENTS:{},
  SETTINGS:{},
  
  PROPS:{

    Main_ID:{ selector: "" },
    Toggle:{
      class_name: "ksdl-toggle",
      class_name_ext: "ksdl-toggle_zero",
      selector: ".ksdl-toggle",
      elm_tag: "a"
    },
    Container:{
      class_name: "ksdl-container", 
      selector: "",
      selector_escape: ".ksdl-container",
      elm_tag: "div"
    },
    Ctrl:{
      class_name: "ksdl-ctrl", 
      selector: ".ksdl-ctrl",
      elm_tag: "div"
    },
    Ctrl_Selection:{
      class_name: "ksdl-selection",
      selector: ".ksdl-ctrl .ksdl-selection",
      elm_tag: "button"
    },
    Ctrl_Search:{
      class_name: "ksdl-search", 
      class_name_ext: "ksdl-search_fail",
      selector: ".ksdl-ctrl .ksdl-search",
      elm_tag: "input"
    },
    Ctrl_Clear:{
      class_name: "ksdl-clear",
      selector: ".ksdl-ctrl .ksdl-clear",
      elm_tag: "button"
    },
    List:{
      class_name: "ksdl-list",
      selector: ".ksdl-list",
      elm_tag: "div"
    },
    List_Label:{
      class_name: "ksdl-label",
      class_name_ext: "ksdl-label_checked",
      selector: ".ksdl-list .ksdl-label",
      elm_tag: "label"
    },
    List_Item:{
      class_name: "ksdl-item",
      selector: ".ksdl-list .ksdl-label .ksdl-item",
      elm_tag: "input"
    }
    
  },

  DEFAULT_SETTINGS:{

    allItemChecked: false,
    containerHeight: "auto",
    containerHeightMax: "350px",
    containerWidth: "300px",
    ctrl: true,
    ctrlSelection: true,
    ctrlSearch: true,
    fontSize: "12px",
    maxToggleItemDisplay: 2,
    maxToggleCharLength: 50,
    pushValuesOnToggle: false,
    singleSelectMode: false

  },

  LISTITEM_INTEGRITY:{
    value:{ value_type: "string", allowed_undefined: false },
    label:{ value_type: "string", allowed_undefined: false },
    checked:{ value_type: "boolean", allowed_undefined: true },
  },

  DATASET_MANDATORY_PROPERTIES:["ContainerID","Name","Settings","ItemList"],
  NON_CONTAINER:["Main_ID","Toggle"],
  STYLE_SETTINGS:["containerHeight","containerHeightMax","containerWidth","fontSize"],
  ALLOWED_LISTENERS: null,
  KEEP_NODELIST: null,

  /* ---------- ---------- ---------- ---------- ---------- */

  NEW(f_ID){

    if(! this.Check_Dataset_Integrity(f_ID)){ return false; }

    this.CONTAINER_IDENTIFIER = `--${this.ID_Randomizer(6)}`;
    this.ALLOWED_LISTENERS = [this.PROPS.Toggle.class_name,this.PROPS.Ctrl_Selection.class_name,this.PROPS.Ctrl_Search.class_name,this.PROPS.Ctrl_Clear.class_name,this.PROPS.List_Item.class_name];
    this.KEEP_NODELIST = [this.PROPS.List_Label.class_name,this.PROPS.List_Item.class_name];

    for(kA in f_ID){

      this.LC.QSA = f_ID[kA].ContainerID;

      this.ELEMENTS[this.LC.QSA] = [];

      // AVOID SETTINGS COLLISION
      if(this.SETTINGS[this.LC.QSA].ctrlSelection.STTNG === false && this.SETTINGS[this.LC.QSA].ctrlSearch.STTNG === false){ this.SETTINGS[this.LC.QSA].ctrl.STTNG = false; }
      if(this.SETTINGS[this.LC.QSA].allItemChecked.STTNG === true && this.SETTINGS[this.LC.QSA].singleSelectMode.STTNG === true){ this.SETTINGS[this.LC.QSA].allItemChecked.STTNG = false; }
      if(this.SETTINGS[this.LC.QSA].singleSelectMode.STTNG === true){ this.SETTINGS[this.LC.QSA].ctrlSelection.STTNG = false; }

      this.GEN_ID.rnd = this.ID_Randomizer(6);

      this.Element_Declare("Main_ID");

      this.elm("Main_ID").appendChild(this.Element_Create("Toggle"));
      this.Element_Declare("Toggle");

      this.CONTAINER_APPEND_PLACE[this.LC.QSA] = (document.querySelector(`#${this.LC.QSA}`).closest("form")) ?? document.body;

      this.CONTAINER_APPEND_PLACE[this.LC.QSA].appendChild(this.Element_Create("Container"));
      this.Element_Declare("Container");

      if(this.SETTINGS[this.LC.QSA].ctrl.STTNG){

        this.elm("Container").appendChild(this.Element_Create("Ctrl"));
        this.Element_Declare("Ctrl");

        if(this.SETTINGS[this.LC.QSA].ctrlSelection.STTNG){

          this.elm("Ctrl").appendChild(this.Element_Create("Ctrl_Selection"));
          this.Element_Declare("Ctrl_Selection");

        }

        if(this.SETTINGS[this.LC.QSA].ctrlSearch.STTNG){

          this.elm("Ctrl").appendChild(this.Element_Create("Ctrl_Search"));
          this.Element_Declare("Ctrl_Search");

          this.elm("Ctrl").appendChild(this.Element_Create("Ctrl_Clear"));
          this.Element_Declare("Ctrl_Clear");

        }

      }

      /* ---------- ---------- ---------- ---------- ---------- */

      this.elm("Container").appendChild(this.Element_Create("List"));
      this.Element_Declare("List");

      for(const [kB, vB] of Object.entries(f_ID[kA].ItemList)){

        this.GEN_ID.for_item = `${this.GEN_ID.rnd}.${("0000" + kB).slice(-4)}`;

        this.elm("List").appendChild(this.Element_Create("List_Label"));

        this.qsa(this.Get_Selector("List_Label"))[kB].appendChild(this.Element_Create("List_Item"));

        this.qsa(this.Get_Selector("List_Item"))[kB].name = f_ID[kA].Name;

        this.qsa(this.Get_Selector("List_Item"))[kB].value = vB.value;

        this.qsa(this.Get_Selector("List_Item"))[kB].type = (this.SETTINGS[this.LC.QSA].singleSelectMode.STTNG) ? "radio" : "checkbox";

        if(vB.checked === true){ this.qsa(this.Get_Selector("List_Item"))[kB].setAttribute("checked",""); }

        if(this.SETTINGS[this.LC.QSA].allItemChecked.STTNG){ this.qsa(this.Get_Selector("List_Item"))[kB].setAttribute("checked",""); }

        this.qsa(this.Get_Selector("List_Label"))[kB].innerHTML += `<span>${vB.label}</span>`;

        if(this.SETTINGS[this.LC.QSA].fontSize.CSTMZ){ this.qsa(this.Get_Selector("List_Label"))[kB].style.fontSize = this.SETTINGS[this.LC.QSA].fontSize.STTNG; }

      }

      this.Element_Declare("List_Label");
      this.Element_Declare("List_Item");

      /* ---------- ---------- ---------- ---------- ---------- */

      if(this.SETTINGS[this.LC.QSA].singleSelectMode.STTNG){

        if(this.Listitem_Info().count !== 1 && this.elm("List_Item").length !== 0){ 

          this.elm("List_Item").forEach(fe_ListItem =>{ fe_ListItem.checked = false; });

          this.elm("List_Item")[0].checked = true;

        }

      }

      /* ---------- ---------- ---------- ---------- ---------- */

      this.Change_iHTML_on_Elms();

      console.log("`" + this.LC.QSA + "` successfully loaded...");

      delete this.CONTAINER_APPEND_PLACE[this.LC.QSA];

      delete this.ELEMENTS[this.LC.QSA].Main_ID;
      delete this.ELEMENTS[this.LC.QSA].Ctrl;
      delete this.ELEMENTS[this.LC.QSA].List;

      for(vProperty in this.SETTINGS[this.LC.QSA]){ delete this.SETTINGS[this.LC.QSA][vProperty].CSTMZ; }
        
    };

    delete this.DATASET_MANDATORY_PROPERTIES;
    delete this.GEN_ID;
    delete this.DEFAULT_SETTINGS;

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Check_Dataset_Integrity(f_ID){

    let rCheck = [];
    rCheck.return = true;
    rCheck.err = "kSDL - Err:\n\n";

    for(kA in f_ID){

      for(const [kE, vE] of Object.entries(this.DATASET_MANDATORY_PROPERTIES)){

        if(! f_ID[kA].hasOwnProperty(vE)){ rCheck.err += `K10: The mandatory property '${vB}' doesn't exist in some dataset!\n`; rCheck.return = false; }

      }

      if(rCheck.return){

        if(! this.Check_Is_Object(f_ID[kA])){ rCheck.err += `K21: The dataset '${kA}' expected as an object!\n`; rCheck.return = false; }

        /* ---------- ContainerID: ---------- */

        if(document.getElementById(f_ID[kA].ContainerID) === null){ rCheck.err += `K20: Container for ID '${f_ID[kA].ContainerID}' doesn't exist!\n`; rCheck.return = false; }

        /* ---------- Settings:{} ---------- */

        if(this.Check_Is_Object(f_ID[kA].Settings)){

          this.SETTINGS[f_ID[kA].ContainerID] = [];

          for(const [kI, vI] of Object.entries(this.DEFAULT_SETTINGS)){

            this.SETTINGS[f_ID[kA].ContainerID][kI] = {STTNG: null, CSTMZ: false}

            this.SETTINGS[f_ID[kA].ContainerID][kI].STTNG = (f_ID[kA].Settings.hasOwnProperty(kI)) ? f_ID[kA].Settings[kI] : vI;

            if(this.STYLE_SETTINGS.includes(kI)){ this.SETTINGS[f_ID[kA].ContainerID][kI].CSTMZ = (this.SETTINGS[f_ID[kA].ContainerID][kI].STTNG == vI) ? false : true; }

          }

        }
        else{

          rCheck.err += `K30: 'Settings' property on '${f_ID[kA].ContainerID}' expected as an object!\n`; rCheck.return = false;

        }

        /* ---------- ItemList:[] ---------- */

        if(Array.isArray(f_ID[kA].ItemList)){

          for(const [kM, vM] of Object.entries(f_ID[kA].ItemList)){

            for(const [kN, vN] of Object.entries(this.LISTITEM_INTEGRITY)){

              if(vM.hasOwnProperty(kN) === false && this.LISTITEM_INTEGRITY[kN].allowed_undefined === false){ rCheck.err += `K40: { '${kN}': } key is mandatory to be possible generate an 'ListItem'.\n`; rCheck.return = false; } 

            }

            for(const [kO, vO] of Object.entries(vM)){

              if(this.LISTITEM_INTEGRITY.hasOwnProperty(kO)){

                if(typeof vO !== this.LISTITEM_INTEGRITY[kO].value_type){

                  rCheck.err += `K41: { ${kO}: '${vO}' } must be a '${this.LISTITEM_INTEGRITY[kO].value_type}'.\n`; rCheck.return = false;

                }

              }
              else{

                rCheck.err += `K42: { '${kO}': } key isn't allowed on 'ListItem' array.\n`; rCheck.return = false;

              }

            }

          }

        }
        else{

          rCheck.err += `'K43: ListItem' must be an array.\n`;

        }

      }

    }

    if(! rCheck.return){ alert(rCheck.err); }

    return rCheck.return;

  },

  Check_Is_Object(f_OBJ){ return (typeof f_OBJ === 'object' && f_OBJ !== null && !Array.isArray(f_OBJ)); },

  ID_Randomizer(f_LENGTH){

    let rVar = [];

    rVar.charsMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    rVar.regex = /^[^\d].*\d.*[^\d]$/;
    rVar.returnStr = "";
    rVar.rndLength = f_LENGTH;
    
    while(! rVar.regex.test(rVar.returnStr)){ rVar.returnStr = Array(rVar.rndLength).fill().map(()=>rVar.charsMap.charAt(Math.random()*rVar.charsMap.length)).join(""); }

    return rVar.returnStr;

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Element_Create(f_ELEMENT){

    let new_Element = document.createElement(this.PROPS[f_ELEMENT].elm_tag);

    new_Element.className = this.PROPS[f_ELEMENT].class_name;

    switch(f_ELEMENT){

      case "Toggle":
        new_Element.href = "javascript:void(0);";
        break;

      case "Container":

        new_Element.id = `${this.LC.QSA}${this.CONTAINER_IDENTIFIER}`;
        new_Element.style.position = "absolute";
        new_Element.style.display = "none";

        if(this.SETTINGS[this.LC.QSA].containerWidth.CSTMZ){ new_Element.style.width = this.SETTINGS[this.LC.QSA].containerWidth.STTNG; }
        if(this.SETTINGS[this.LC.QSA].containerHeight.CSTMZ){ new_Element.style.height = this.SETTINGS[this.LC.QSA].containerHeight.STTNG; }
        if(this.SETTINGS[this.LC.QSA].containerHeightMax.CSTMZ){ new_Element.style.maxHeight = this.SETTINGS[this.LC.QSA].containerHeightMax.STTNG; }

        break;

      case "Ctrl_Selection":
        new_Element.type = "button";
        break;

      case "Ctrl_Search":
        
        new_Element.id = `${this.GEN_ID.rnd}.ctrlSearch`;
        new_Element.type = "text";
        new_Element.placeholder = "Search ...";
        new_Element.maxLength = 30;
        new_Element.setAttribute("autocomplete","off");

        if(! this.SETTINGS[this.LC.QSA].ctrlSelection.STTNG){
          new_Element.style.marginLeft = "0px";
          new_Element.style.width = "100%";
        }

        break;

      case "Ctrl_Clear":
        new_Element.type = "button";
        new_Element.innerHTML = "X";
        break;

      case "List_Label":
        new_Element.htmlFor = this.GEN_ID.for_item;
        break;

      case "List_Item":
        new_Element.id = this.GEN_ID.for_item;
        break;
    }

    return new_Element;

  },

  Element_Declare(f_ELEMENT){

    let vELM = this.qsa(this.Get_Selector(f_ELEMENT));

    if(vELM !== null){ this.ELEMENTS[this.LC.QSA][f_ELEMENT] = (! this.KEEP_NODELIST.includes(this.PROPS[f_ELEMENT].class_name)) ? [...vELM][0] : vELM; }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Get_Selector(f_ELEMENT){

    let vID = (this.NON_CONTAINER.includes(f_ELEMENT)) ? `#${this.LC.QSA}` : `#${this.LC.QSA}${this.CONTAINER_IDENTIFIER}`;

    return `${vID} ${this.PROPS[f_ELEMENT].selector}`;

  },

  qsa(f_SELECTOR){ return document.querySelectorAll(f_SELECTOR); },

  elm(f_ELEMENT){ return this.ELEMENTS[this.LC.QSA][f_ELEMENT]; },

  /* ---------- ---------- ---------- ---------- ---------- */

  Main(){

    this.LC.CLASS = event.target.className.split(" ")[0];

    if(! this.ALLOWED_LISTENERS.includes(this.LC.CLASS)){ return false; }

    if(this.LC.CLASS == this.PROPS.Toggle.class_name){ this.LC.ID = event.target.parentNode.id; }

    if(this.LC.ID === "INI"){ return false; }

    this.LC.QSA = this.LC.ID;

    switch(this.LC.CLASS){

      case this.PROPS.Toggle.class_name:
        this.Container_Visibility();
        break;
       
      case this.PROPS.Ctrl_Selection.class_name:
        this.Listitem_Selection();
        break;

      case this.PROPS.Ctrl_Search.class_name:
        this.Search_on_List();
        break;

      case this.PROPS.Ctrl_Clear.class_name:
        this.Search_Clear();
        this.Search_on_List();
        break;

      case this.PROPS.List_Item.class_name:
        this.Change_iHTML_on_Elms();
        break;

      default:
        alert("Err: K00");
        break;

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Container_Visibility(){ 

    this.Container_Reposition();
    this.elm("Container").style.display = (this.elm("Container").style.display === "none") ? "flex" : "none";

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Change_iHTML_on_Elms(){

    let rPrint = [];
    let rListitemInfo = this.Listitem_Info();

    if(rListitemInfo.count === 0){ 

      rPrint.toggle = "Selected ( 0 )";
      rPrint.ctrl_selection = "ALL";
      this.elm("Toggle").classList.add(this.PROPS.Toggle.class_name_ext);

    }
    else{ 

      rPrint.toggle = "All Selected";
      rPrint.ctrl_selection = "RESET";
      this.elm("Toggle").classList.remove(this.PROPS.Toggle.class_name_ext);

    }

    if(rListitemInfo.count !== 0 && rListitemInfo.count !== this.elm("List_Item").length){

      if(rListitemInfo.count > this.SETTINGS[this.LC.QSA].maxToggleItemDisplay.STTNG){

        rPrint.toggle  = `Selected ( ${rListitemInfo.count} )`;

      }
      else{

        rPrint.toggle = rListitemInfo.checked_items.slice(0,this.SETTINGS[this.LC.QSA].maxToggleItemDisplay.STTNG).join(', ');

        rPrint.toggle = (rPrint.toggle.length <= this.SETTINGS[this.LC.QSA].maxToggleCharLength.STTNG) ? rPrint.toggle : `${rPrint.toggle.substring(0,this.SETTINGS[this.LC.QSA].maxToggleCharLength.STTNG)} ...`;
        
      }

    }

    this.elm("Toggle").innerHTML = rPrint.toggle;

    if(this.elm("Ctrl_Selection")){ this.elm("Ctrl_Selection").innerHTML = rPrint.ctrl_selection; }

  },

  Listitem_Info(){

    let rReturn = [];
    rReturn.count = 0;
    rReturn.checked_items = [];

    this.elm("List_Item").forEach((fe_Item, index) =>{

      if(fe_Item.checked === true){ 

        rReturn.count++;

        (this.SETTINGS[this.LC.QSA].pushValuesOnToggle.STTNG) ? rReturn.checked_items.push(fe_Item.value) : rReturn.checked_items.push(fe_Item.nextElementSibling.innerText);

        this.elm("List_Label")[index].classList.add(this.PROPS.List_Label.class_name_ext); 

      }
      else{

        this.elm("List_Label")[index].classList.remove(this.PROPS.List_Label.class_name_ext);

      }

    });

    rReturn.status = (rReturn.count == 0) ? true : false;

    return rReturn;

  },

  Listitem_Selection(){

    if(! this.SETTINGS[this.LC.QSA].singleSelectMode.STTNG){

      let vStatus = this.Listitem_Info().status;

      this.elm("List_Item").forEach(fe_Item =>{ fe_Item.checked = vStatus; });

      this.Change_iHTML_on_Elms();

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Search_on_List(){

    let rSearch = [];
    rSearch.to_lower = this.elm("Ctrl_Search").value.toLowerCase();
    rSearch.count_notfound = 0;

    this.Ctrl_Clear_Display();

    for(let i = 0; i < this.elm("List_Item").length; i++){

      if(this.elm("List_Item")[i].nextElementSibling.innerText.toLowerCase().indexOf(rSearch.to_lower) == -1){

        this.elm("List_Label")[i].style.display = "none";

        rSearch.count_notfound++;

      }
      else{

        this.elm("List_Label")[i].style.display = "";

      }

      (rSearch.count_notfound == this.elm("List_Item").length) ? this.elm("Ctrl_Search").classList.add(this.PROPS.Ctrl_Search.class_name_ext) : this.elm("Ctrl_Search").classList.remove(this.PROPS.Ctrl_Search.class_name_ext);

    }

  },

  Search_Clear(){ this.elm("Ctrl_Search").value = ""; },

  Ctrl_Clear_Display(){ this.elm("Ctrl_Clear").style.display = (this.elm("Ctrl_Search").value.length === 0) ? "none" : "inline-block"; },

  /* ---------- ---------- ---------- ---------- ---------- */

  Listitem_Selection_on_Contextmenu(){

    if(event.target.className.split(" ")[0] == this.PROPS.Toggle.class_name){

      this.LC.QSA = event.target.parentNode.id;

      event.preventDefault();
      this.Listitem_Selection();
      return false;

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Close_All_Containers_Clicking_Outside(){

    if(! event.target.closest){ return false; }

    if(! (event.type === "touchstart" && event.target.className === this.PROPS.Toggle.class_name)){

      this.qsa(this.PROPS.Container.selector_escape).forEach(fe_Container =>{

        if(event.target.closest(this.PROPS.Container.selector_escape) === null && event.target.parentNode.id !== this.LC.ID){ fe_Container.style.display = "none"; }

      });

    }

  },

  /* ---------- ---------- ---------- ---------- ---------- */

  Container_Reposition(){ 

    if(this.LC.ID === "INI"){ return false; }

    let rPos = [];

    rPos.max_width = window.innerWidth;

    rPos.toggle_left = this.elm("Toggle").getBoundingClientRect().left;
    rPos.toggle_top = this.elm("Toggle").getBoundingClientRect().top;
    rPos.toggle_height = this.elm("Toggle").offsetHeight;

    rPos.overflow_check = rPos.toggle_left + parseInt(this.SETTINGS[this.LC.ID].containerWidth.STTNG);

    rPos.set_left = rPos.toggle_left + "px";
    rPos.set_left_responsive = ((window.innerWidth - parseInt(this.SETTINGS[this.LC.ID].containerWidth.STTNG)) - 10) + "px";

    rPos.set_top = (rPos.toggle_top + rPos.toggle_height + window.scrollY + 2) + "px";

    this.elm("Container").style.left = (rPos.overflow_check < rPos.max_width) ? rPos.set_left : rPos.set_left_responsive;
    this.elm("Container").style.top = rPos.set_top;

  }

};

/* ---------- ---------- ---------- ---------- ---------- */

window.addEventListener("click", function(){ kSDL.Close_All_Containers_Clicking_Outside(); kSDL.Main(); });

window.addEventListener("scroll", function(){ kSDL.Close_All_Containers_Clicking_Outside(); }, true);

window.addEventListener("touchstart", function(){ kSDL.Close_All_Containers_Clicking_Outside(); });

window.addEventListener("contextmenu", function(){ kSDL.Listitem_Selection_on_Contextmenu(); });

window.addEventListener("keyup", function(){ kSDL.Main(); });

window.addEventListener("resize", function(){ kSDL.Container_Reposition(); });

/*

-- kSDL v2023.1201 --

https://appnexa.net/dev/kSDL/v2023.1201/

by Ivo Rubim

page: https://appnexa.net/dev/ivorubim/ 
contact: rubim.ivo@gmail.com

*/