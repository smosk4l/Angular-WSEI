import { Component, OnInit } from '@angular/core';
import { FunctionalityService } from 'src/app/services/functionality.service';
import { Router } from '@angular/router';
import { FunctionalityInterface } from 'src/app/interfaces/functionality.interface';

@Component({
  selector: 'app-functionality-list',
  templateUrl: './functionality-list.component.html',
  styleUrls: ['./functionality-list.component.scss'],
})
export class FunctionalityListComponent implements OnInit {
  functionality: FunctionalityInterface[] = [];

  constructor(
    private functionalityService: FunctionalityService,
    private router: Router
  ) {
    this.functionalityService
      .getFunctionalities()
      .subscribe((functionality: FunctionalityInterface[]) => {
        this.functionality = functionality;
      });
  }

  ngOnInit(): void {
    console.log(this.functionality);
  }

  showFunctionalityDetails() {
    // Implementacja funkcji wyświetlającej szczegóły funkcjonalności
  }

  deleteFunctionality(id: string) {
    this.functionalityService.deleteFunctionality(id).subscribe(
      () => {
        console.log('Funkcjonalność została usunięta.');
        this.functionality = this.functionality.filter(
          (item) => item.ID !== id
        );
      },
      (error) => {
        console.error('Wystąpił błąd podczas usuwania funkcjonalności:', error);
      }
    );
  }

  addFunctionality() {
    this.router.navigate(['functionalities/create']);
  }
}
