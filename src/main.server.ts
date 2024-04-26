import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import necessary modules

// Configure HttpClient with fetch
provideHttpClient(withFetch());

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
