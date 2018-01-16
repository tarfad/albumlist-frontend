import {Injectable} from "@angular/core";
import {validYears} from "../../environments/environment";
import {EnvironmentSpecificService} from "../core/services/environment-specific.service";

@Injectable()
export class ConfigService {

  yearStart: number;
  yearEnd: number;
  years: number[];

  constructor(private envSpecificSvc: EnvironmentSpecificService) {
    this.yearStart = envSpecificSvc.envSpecific.yearStart;
    this.yearEnd = envSpecificSvc.envSpecific.yearEnd;
    this.loadYears();
  }

  private loadYears() {
    var result = [];
    for (var i = this.yearStart; i <= this.yearEnd; i++) {
      result.push(i);
    }
    this.years = result;
  }

  getYears = function () {
    return this.years;
  };
}
