import { Component, OnInit } from '@angular/core';
import { Candidato } from '../../interfaces/candidato';
import { PanelService } from '../../services/panel.service';

import Swal from 'sweetalert2';

import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-pandel-administrar',
  templateUrl: './pandel-administrar.component.html',
  styleUrls: ['./pandel-administrar.component.css']
})
export class PandelAdministrarComponent implements OnInit{

  contralores: Candidato[] = [];
  personeros: Candidato[] = []

  totalContralores: number = 0;
  totalPersoneros: number = 0;

  estudiantesVotantes:number = 0; 
  estudiantesVotaron:number = 0;
  estudiantesNoVotaron:number = 0;


  get isLoading(){
    return this.panelService.isLoading;
  }

  constructor(private panelService: PanelService, 
              private router:Router){}




  ngOnInit(): void {
      
      this.panelService.getResultados()
        .subscribe(resp =>{
          this.contralores = resp.candidatos.contralores;
          this.personeros = resp.candidatos.personeros;
          this.totalContralores = resp.totalContralores;
          this.totalPersoneros = resp.totalPersoneros;
          this.estudiantesVotantes = resp.estudiantesVotantes;
          this.estudiantesVotaron = resp.estudiantesVotaron;
          this.estudiantesNoVotaron = resp.estudiantesNoVotaron;

          console.log(this.personeros);

          const labelsPersoneros:string[] = [];
          const dataPersoneros:number[] = [];
          for (const personero of this.personeros) {
            labelsPersoneros.push(`${personero.nombre} #${personero.numero}`);
            dataPersoneros.push(personero.votos!);
          }

          console.log(labelsPersoneros);
          console.log(dataPersoneros);
          
          const myChart = new Chart("personeros", {
            type: 'bar',
            data: {
                
                labels: labelsPersoneros,
                datasets: [{
                    data: dataPersoneros,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 0
                    }
                },
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Resultado Personeria'
                  }
                }
            }
        });


        const labelsContralores:string[] = [];
        const dataContralores:number[] = [];

        for (const contralor of this.contralores) {
          labelsContralores.push(`${contralor.nombre} #${contralor.numero}`);
          dataContralores.push(contralor.votos!);
        }

          const contralorChar = new Chart("contralores", {
            type: 'bar',
            data: {
                
                labels: labelsContralores,
                datasets: [{
                    data: dataContralores,
                    backgroundColor: [
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 206, 86,1)',
                      'rgba(54, 162, 235,1)',
                      'rgba(75, 192, 192,1)',
                      'rgba(255, 99, 132,1)',
                      'rgba(255, 159, 64,1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        min: 0
                    }
                },
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: 'Resultado Contraloria'
                  }
                }
            }
        });


        const estadisticaChart = new Chart("estadistica", {
          type: 'pie',
          data: {
              
              labels: ['Ya Votaron', 'No Han Votado'],
              datasets: [{
                  data: [this.estudiantesVotaron, this.estudiantesNoVotaron],
                  backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 206, 86,1)',
                    'rgba(54, 162, 235,1)',
                    'rgba(75, 192, 192,1)',
                    'rgba(255, 99, 132,1)',
                    'rgba(255, 159, 64,1)'
                  ],
                  borderWidth: 2
              }]
          },
          options: {
              scales: {
                  y: {
                      grid:{
                        display: false
                      }
                  },
                  x: {
                    grid:{
                      display: false
                    }
                  },
              },
              responsive: true,
              plugins: {
                legend: {
                  display: true
                },
                title: {
                  display: false,
                  text: 'Estadistica'
                }
              }
          }
      });





        });

        
  }

  reiniciar(){
    const resp = Swal.fire({
      title: 'Confirmar',
      icon: 'question',
      text: '¿Está seguro que desea reiniciar la votación?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () =>{  
        return this.panelService.reiniciar()
          .subscribe(resp =>{
            if(resp.ok){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${resp.mensaje}`,
                showConfirmButton: false,
                timer: 1500
              });
              window.location.reload();
            }else{
              Swal.fire('Error', resp.mensaje, 'error');
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  salir(){
    localStorage.removeItem('x-token');
    this.router.navigateByUrl('/in');
  }
  

}
