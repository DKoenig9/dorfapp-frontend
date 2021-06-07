import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkService } from 'src/app/work/work.service';
import { AdminPanelService } from '../../admin-panel/admin-panel.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Wirklich Löschen?</h4>
      <button
        type="button"
        class="btn close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        Soll <strong>{{ text }}</strong> wirklich unwiederruflich gelöscht
        werden?
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('cancle click')"
      >
        Abbrechen
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="activeModal.close('Ok click')"
        (click)="onDelete(item)"
      >
        OK
      </button>
    </div>
  `,
})
export class modalDelete {
  @Input() item;
  @Input() text;
  constructor(
    public activeModal: NgbActiveModal,
    private adminPanelService: AdminPanelService,
    private workService: WorkService
  ) {}

  onDelete(item) {
    console.log(item);
    if (item.__typename === 'User') {
      this.adminPanelService.deleteUser(item);
    } else if (item.__typename === 'WorkWould') {
      this.workService.deleteWorkWould(item);
    } else if (item.__typename === 'WorkNeed') {
      this.workService.deleteWorkNeed(item);
    } else return;
  }
}
