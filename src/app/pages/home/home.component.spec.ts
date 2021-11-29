import {ComponentFixture, TestBed} from '@angular/core/testing';
import {imports} from 'src/app/core/providers';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find the user wrapper', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const idUsuarioExistente = 'tswp47G8BfV3VNCnnzGE';
    await component.readUsersAsync();
    const userWrapper = await component.getUserWrapper(idUsuarioExistente);
    expect(userWrapper).toBeTruthy();
  });

  it('should not find the user wrapper because id does not exist on db', async () => {
    // esta prueba asume existencia de datos en la colección de 'usuarios' en la db
    // lo ideal es tener un mock que asegure que hay datos en la colección
    const idUsuarioInexistente = 'idQueNoExisteEnDb';
    await component.readUsersAsync();
    const userWrapper = await component.getUserWrapper(idUsuarioInexistente);
    expect(userWrapper).toBeFalsy();
  });
});
