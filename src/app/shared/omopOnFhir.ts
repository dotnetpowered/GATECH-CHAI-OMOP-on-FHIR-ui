import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Injectable({providedIn: 'root'})
export class SettingApi {

    constructor(private http: HttpClient) {

    }

    getSettings() : Observable<Settings> {
        return this.http.get(`https://localhost:5001/api/server/settings`)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    getResources() : Observable<ResourceStat[]> {
        return this.http.get(`https://localhost:5001/api/server/resources`)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    getMapping(resource: string): Observable<ResourceMapping> {
        console.log('getMapping(' + resource + ')');
        return this.http.get(`https://localhost:5001/api/server/resource/${resource}/mapping`)
            .pipe(map(this.extractData))
            .pipe(catchError(this.handleError));
    }

    protected handleError(error: any) {
        // log error
        console.error('Error calling service:', error);

        // throw an application level error
        return throwError(error);
    }

    protected extractData(res) {
        console.log('Extracting Data', res);
        return res;
    }
}

export interface Settings {
    KeyProvider: string;
    DatabaseProvider: string;
    FhirEndpoint: string;
    FhirVersion: string;
    OmopVersion: string;
    OmopOnFhir_Version: string;
    OmopOnFhir_Edition: string;
    OmopOnFhir_Credits: string;
}

export interface ResourceStat {
    resourceName: string;
    count: number;
}
export interface ResourceMapping {
    resource: string;
    entities: EntityMapping[];
    fhirMappings: FhirMapping[];
}

export interface FhirConstraint {
    expression: string;
}

export interface OmopAttribute {
    name: string;
    primaryKey: boolean;
    required: boolean;
    type: number;
    description: string;
    length?: any;
    relatedTo?: any;
}

export interface OmopEntity {
    name: string;
    attributes: OmopAttribute[];
    primaryKey: OmopAttribute;
}

export interface AttributeMapping {
    attribute: OmopAttribute;
    path: string;
}

export interface OmopMapping {
    entity: OmopEntity;
    mapping: string;
    attributes: AttributeMapping[];
    constraints: FhirConstraint[];
}

export interface EntityMapping {
    omopMappings: OmopMapping[];
    entity: string;
    when?: any;
    mapping: string;
    omopFilter?: any;
    omopMapping: string;
    fhirMapping: string;
}

export interface FhirMapping {
    omopEntityName: string;
    ommopFilter?: any;
    mapping: string;
    map: any;
    relatedIds?: any;
}
