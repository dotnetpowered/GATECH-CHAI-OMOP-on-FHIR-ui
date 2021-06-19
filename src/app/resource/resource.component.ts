import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceMapping, SettingApi } from '../shared/omopOnFhir';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  resourceMap: ResourceMapping;
  resourceName: string;

  constructor(private settingApi: SettingApi, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const p: any = this.route.params;
    this.resourceName = p.value.name;

    this.settingApi.getMapping(this.resourceName).subscribe((mapping)=>{
      this.resourceMap = mapping;
      console.log("Resource map", this.resourceMap);
    });
  }

}
