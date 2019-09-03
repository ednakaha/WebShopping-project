import { Jwt } from './jwt';
import { LoginService } from '../services/login/login.service';

describe('Jwt', () => {
  it('should create an instance', () => {
    expect(new Jwt(null)).toBeTruthy();
    //edna todo null?
  });
});