import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FestivalsComponent } from "./festivals.component";
import { FestivalDataService } from '../core/data-services/festival-data.service';
import { of } from "rxjs/internal/observable/of";
import { FestivalBand } from "../core/models/festival.model";
import { unsortedMockDataFromDifferentFestival, unsortedMockDataFromSameFestival, unsortedMockDataWithBandNameAsEmptyString, unsortedMockDataWithBandNameHavingDigitsAsPrefix, unsortedMockDataWithBandParticipatingInMultipleFestivals, unsortedMockDataWithBandsNotParticipatingInAnyFestival } from "./mockData";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('FestivalsComponent', () => {
    let component: FestivalsComponent,
        fixture: ComponentFixture<FestivalsComponent>,
        festivalsDataService: any,
        debugEle:DebugElement;
    const cssLocator = 'ol > li';
    beforeEach(async () => {
        const festivalsDataServiceMock = jasmine.createSpyObj('FestivalDataService', ['getFestivalsData'])
        TestBed.configureTestingModule({
            declarations: [FestivalsComponent],
            providers: [
                HttpClientModule,
                { provide: FestivalDataService, useValue: festivalsDataServiceMock }
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(FestivalsComponent);
                component = fixture.componentInstance;
                festivalsDataService = TestBed.inject(FestivalDataService);
                debugEle =fixture.debugElement;
            });
    });
    it('should create component', () => {
        expect(fixture.componentInstance instanceof FestivalsComponent).toBeTruthy('Failed to create component');
    })
    it('should sort band data from Same Festival by Band Name Alphabetically in Ascending order', done => {
        const expectedData: FestivalBand[]=[
            {bandName: 'Auditones', festivalName:'Twisted Tour'},
            {bandName: 'Manish Ditch', festivalName:'Twisted Tour'},
            {bandName: 'Squint-281', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'Winter Primates', festivalName:'Twisted Tour'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataFromSameFestival));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(5);
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        //UI Checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
        for(var i=0;i<expectedData.length;i++){
            var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
            var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
            expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
        }
    });
    //Since this functionality is to list Bands partcipating in Festivals
    //Question is if bands not participating in any should be displayed, it should be clarified
    //For this exercise only,I am making an assumption here they should not be and hence this test is failing
    it('should exclude bands not participating in any festival', done => {
        const expectedData: FestivalBand[]=[
            {bandName: 'Auditones', festivalName:'Twisted Tour'},
            {bandName: 'Manish Ditch', festivalName:'Twisted Tour'},
            {bandName: 'Squint-281', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'Winter Primates', festivalName:'Twisted Tour'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataWithBandsNotParticipatingInAnyFestival));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(5);
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        // UI checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
            for(var i=0;i<expectedData.length;i++){
                var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
                var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
                expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
            }           
    });
    it('should sort band data from Different Festival by Band Name Alphabetically in Ascending order', done => {
        const expectedData: FestivalBand[]=[
            {bandName: 'Auditones', festivalName:'Twisted Tour'},
            {bandName: 'Manish Ditch', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'The Black Dashes', festivalName:'Small Night In'},
            {bandName: 'Yanke East', festivalName:'Small Night In'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataFromDifferentFestival));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(5);
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        // UI checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
            for(var i=0;i<expectedData.length;i++){
                var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
                var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
                expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
            }
    });
    //When Band participating in multiple festivals, currently its being listed separetely
    //Question to be raised is if it should group by band name and display as below and also if to peform 2nd level sorting on festival name :
    //e.g. 3. Summon
                // Twisted Tour
                // Small Night In
    it('should list band for All Festivals when participating In Multiple Festivals', done => {
        const expectedData: FestivalBand[]=[
            {bandName: 'Auditones', festivalName:'Twisted Tour'},
            {bandName: 'Manish Ditch', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Small Night In'},
            {bandName: 'The Black Dashes', festivalName:'Small Night In'},
            {bandName: 'Yanke East', festivalName:'Small Night In'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataWithBandParticipatingInMultipleFestivals));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(6);
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        // UI checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
            for(var i=0;i<expectedData.length;i++){
                var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
                var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
                expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
            }        
    });
    //Assumption here is Band without a Name should not be listed, Using that assumption it's a Defect. 
    //If its not mentioned as part of requirements,should be verified with business
    it('should list band with empty string first', done => {
        const expectedData: FestivalBand[]=[
            {bandName: 'Auditones', festivalName:'Twisted Tour'},            
            {bandName: 'Squint-281', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'Winter Primates', festivalName:'Twisted Tour'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataWithBandNameAsEmptyString));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(5);
            console.log(JSON.stringify(result));
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        // UI checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
            for(var i=0;i<expectedData.length;i++){
                var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
                var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
                expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
            }           
    });
    it('should list band with number as prefix first', done => {
        const expectedData: FestivalBand[]=[
            {bandName: '1st Class Band', festivalName:'Twisted Tour'},
            {bandName: 'Auditones', festivalName:'Twisted Tour'},            
            {bandName: 'Squint-281', festivalName:'Twisted Tour'},
            {bandName: 'Summon', festivalName:'Twisted Tour'},
            {bandName: 'Winter Primates', festivalName:'Twisted Tour'},
        ]
        festivalsDataService.getFestivalsData.and.returnValue(of(unsortedMockDataWithBandNameHavingDigitsAsPrefix));
        fixture.detectChanges();
        component.ngOnInit()
        component.festivalBands$.subscribe(result=>{
            expect(result.length).toEqual(5);
            console.log(JSON.stringify(result));
            expect(JSON.stringify(result) === JSON.stringify(expectedData)).toBeTruthy('Festival data is not sorted successfully');
            done();
        });
        // UI checks
        var allListElements =debugEle.queryAll(By.css(cssLocator));
            for(var i=0;i<expectedData.length;i++){
                var expectedBandAndFestivalName = expectedData[i].bandName + '  '+ expectedData[i].festivalName;
                var actualBandAndFestivalName = allListElements[i].nativeElement.textContent.trim();
                expect(expectedBandAndFestivalName).toEqual(actualBandAndFestivalName);
            }           
    });
})
