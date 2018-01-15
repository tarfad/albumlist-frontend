import {Injectable} from "@angular/core";
import {validYears} from "../../environments/environment";

@Injectable()
export class ConfigService {

  getYears = function() {
    console.log('getYears');
    var result = [];
    for (var i = validYears.yearStart; i <= validYears.yearEnd; i++) {
      result.push(i);
    }
    return result;
  };

}
