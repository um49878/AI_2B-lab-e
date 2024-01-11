import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../task";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {
  public tasks: Task[] = [];

  constructor(private taskService: TasksService) {
  }

  ngOnInit(){
    this.taskService.index(true).subscribe((tasks) =>{
      this.tasks = tasks;
    })
  }

  delete(task: Task){
    if (!confirm ("Wiesz co robisz?")){
      return;
    }
    this.taskService.delete(task).subscribe(()=>{
      this.ngOnInit();
    })
  }

  isExpired(deadlineString: any): boolean {
    const parts = deadlineString.split('-');
    const inputDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return inputDate.getDate() < new Date().getDate();
  }
}
