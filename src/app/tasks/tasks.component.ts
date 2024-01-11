import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../task";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  public tasks: Task[] = [];
  public newTask: Task = {};
  public inWork = false;

  constructor(
    private tasksService: TasksService
  ) {
  }
  ngOnInit() {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.inWork = false;
  }

  isExpired(deadlineString: any): boolean {
    const parts = deadlineString.split('-');
    const inputDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return inputDate.getDate() < new Date().getDate();
  }

  addTask(){
    if (this.newTask.title === undefined){
      return;
    }

    this.inWork=true;

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasks.unshift(this.newTask);

    this.tasksService.post(this.newTask).subscribe((task : Task) =>{
      this.newTask={};
      this.ngOnInit();
    })
  }

  handleChange(task: Task) {
    this.tasksService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted(){
    const observables: Observable<any>[] = [];
    for (const task of this.tasks){
      if (!task.completed){
        continue;
      }
      task.archived = true;
      observables.push(this.tasksService.put(task));
    }
    forkJoin(observables).subscribe(()=>{this.ngOnInit()});
  }

}


