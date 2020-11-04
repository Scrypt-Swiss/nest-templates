import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { LibraryOptions } from './library.schema';

describe('Library Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );
  it('should manage name only', async () => {
    const options: LibraryOptions = {
      name: 'project',
      prefix: 'app',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('library', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      '/libs/project/tsconfig.lib.json',
      '/libs/project/src/index.ts',
      '/libs/project/src/project.module.ts',
      '/libs/project/src/project.service.spec.ts',
      '/libs/project/src/project.service.ts',
    ]);
  });
  it('should manage name to dasherize', async () => {
    const options: LibraryOptions = {
      name: 'awesomeProject',
      prefix: 'app',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('library', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      '/libs/awesome-project/tsconfig.lib.json',
      '/libs/awesome-project/src/index.ts',
      '/libs/awesome-project/src/awesome-project.module.ts',
      '/libs/awesome-project/src/awesome-project.service.spec.ts',
      '/libs/awesome-project/src/awesome-project.service.ts',
    ]);
  });
  it('should manage javascript files', async () => {
    const options: LibraryOptions = {
      name: 'project',
      language: 'js',
      prefix: 'app',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('library', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      '/libs/project/.babelrc',
      '/libs/project/jsconfig.json',
      '/libs/project/src/index.js',
      '/libs/project/src/project.module.js',
      '/libs/project/src/project.service.js',
      '/libs/project/src/project.service.spec.js',
    ]);
  });
});
