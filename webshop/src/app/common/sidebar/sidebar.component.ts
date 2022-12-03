import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() onSideClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event:Event){
    let clickedElement=(event.target as HTMLElement)
    let currentClassList=clickedElement.classList;
    let sideLinks=document.querySelectorAll("a.side-link")
    sideLinks.forEach(item=>{item.classList.remove("bg-gradient-primary")})
    currentClassList.add("bg-gradient-primary"); 
    this.onSideClick.emit(clickedElement.children[1].innerHTML) 

  }

  

}
