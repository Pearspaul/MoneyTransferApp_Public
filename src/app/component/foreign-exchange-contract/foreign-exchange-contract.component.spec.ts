import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignExchangeContractComponent } from './foreign-exchange-contract.component';

describe('ForeignExchangeContractComponent', () => {
  let component: ForeignExchangeContractComponent;
  let fixture: ComponentFixture<ForeignExchangeContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignExchangeContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeignExchangeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
