import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Globals } from '../shared/globals';
import { ResourceStat, SettingApi, Settings } from '../shared/omopOnFhir';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {
  resources: ResourceStat[];
  settings: Settings;

  constructor(private settingApi: SettingApi,
    private router: Router, private globals: Globals) { }

  ngOnInit(): void {
    this.settingApi.getResources().subscribe((resources)=>{
      resources.sort((a,b) => (a.resourceName > b.resourceName) ? 1 : ((b.resourceName > a.resourceName) ? -1 : 0))
      this.resources = resources;
    });

    this.settingApi.getSettings().subscribe((settings)=>{
      this.settings = settings;
    });
  }
}
