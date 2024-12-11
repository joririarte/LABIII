import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { FormsModule } from '@angular/forms';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzListModule } from 'ng-zorro-antd/list';
import { IconsProviderModule } from './icons-provider.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  imports:[
    NzPopoverModule
  ],
  exports: [
    NzButtonModule,
    NzEmptyModule,
    NzInputModule,
    NzTagModule,
    NzAvatarModule,
    NzDatePickerModule,
    NzSelectModule,
    NzGridModule,
    NzIconModule,
    NzBadgeModule,
    NzToolTipModule,
    NzDividerModule,
    NzLayoutModule,
    NzSkeletonModule,
    IconsProviderModule,
    NzMenuModule,
    NzCardModule,
    NzDropDownModule,
    NzTableModule,
    NzCommentModule,
    NzModalModule,
    NzUploadModule,
    NzFormModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzModalModule,
    NzUploadModule,
    NzNotificationModule,
    NzSpinModule,
    NzDrawerModule,
    NzPopoverModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    NzTabsModule,
    NzTypographyModule,
    NzMessageModule,
    NzStepsModule,
    NzRadioModule,
    NzProgressModule,
    NzSwitchModule,
    NzAlertModule,
    FormsModule,
    NzResultModule,
    NzInputModule,
    NzListModule
  ],
})
export class NgZorroModule {}
