import { ElementRef } from '@angular/core';

declare var M;
export interface MaterialInstance {
  open?():void
  close?():void
  destroy?():void
}
export interface MaterialDatepicker extends MaterialInstance {
    date?:Date;
}

export class MaterialService
{

static updateTextInput(){
  M.updateTextFields();
}

  static initDatepicker(ref:ElementRef,onClose:()=>void):MaterialDatepicker{
    return M.Datepicker.init(ref.nativeElement,{
      format:'ddmmyyyy',
      showClearBtn:true,
      defaultDate:null,
      setDefaultDate:false,
     
      onClose:onClose,
      i18n:{
        clear:"скинути",
        cancel:"відміна"
      },
      autoClose:true

    });
  }
  static initSelect(ref:ElementRef):MaterialInstance{
      return M.FormSelect.init(ref.nativeElement,{
        dropdownOptions:{
          input:'li',
          dropdown:'Dropdown'
        }
      })
  }
  static sideNav(ref:ElementRef):MaterialInstance{
    return M.Sidenav.init(ref.nativeElement)
  }
}
