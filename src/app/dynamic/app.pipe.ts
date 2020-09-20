import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   *
   * @param- v
   */
  transform(v: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
