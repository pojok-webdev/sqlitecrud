import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms'
import { DbService } from '../service/db.service'
import { ToastController } from '@ionic/angular'
import { Router } from '@angular/router'
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
mainForm:FormGroup
Data:any[]=[]
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}
  ngOnInit(){
    this.db.dbState().subscribe(res=>{
      if(res){
        this.db.fetchSongs().subscribe(item=>{
          this.Data = item
        })
      }
    })
    this.mainForm = this.formBuilder.group({
      artist:[''],
      song:['']
    })
  }
  storeData(){
    this.db.addSong(
      this.mainForm.value.artist,this.mainForm.value.song
    ).then(res=>{
      this.mainForm.reset()
    })
  }
  deleteSong(id){
    this.db.deleteSong(id).then(async(res)=>{
      let toast = await this.toast.create({
        message:'Song deleted',duration:2500
      })
      toast.present()
    })
  }
}
