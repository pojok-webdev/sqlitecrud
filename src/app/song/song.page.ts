import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { DbService } from '../service/db.service'
import { ActivatedRoute, Router } from '@angular/router' 

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
editForm: FormGroup
id:any
  constructor(
    private db:DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id')
    this.db.getSong(this.id).then(res=>{
      this.editForm.setValue({
        artistName:res['artist_name'],
        song_name:res['song_name']
      })
    },err=>{})
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      artis_name:[''],song_name:['']
    })
  }

  saveForm(){
    this.db.updateSong(this.id,this.editForm.value)
    .then(res=>{
      console.log('Res',res)
      this.router.navigate(['/home'])
    })
  }

}
