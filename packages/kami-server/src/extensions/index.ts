// Extensions loader.
// Extensions are automatically watched and reloaded so when developing an extension you just need to place it in the folder.
import * as fs from 'fs';
import { PublicationSource } from 'kami-lib';
import * as path from 'path';
import { container } from 'tsyringe';

interface ExtensionsManagerInterface {
  onDirectoryChange: fs.WatchListener<Buffer>;
}

export enum ExtensionType {
  PUBLICATION_SOURCE = 'publication-source',
}

export interface ExtensionDefinition {
  name: string;
  version: string;
  path: string;
  type: ExtensionType;
  instance: PublicationSource;
}

export class ExtensionsManager implements ExtensionsManagerInterface {
  private registry = new Map<string, ExtensionDefinition>();

  public getExtensionByName(name: string): ExtensionDefinition {
    return this.registry.get(name);
  }

  public getExtensionsByType(type: ExtensionType): ExtensionDefinition[] {
    return [...this.registry.values()].filter((def) => def.type === type);
  }

  public async watchDirectory(dir: string) {
    await this.readDirectory(dir);
    // TODO: consider using chokidar or something more cross-platform
    fs.watch(dir, this.onDirectoryChange.bind(this));
  }

  public onDirectoryChange<Buffer>(event: fs.WatchEventType, filename: Buffer) {
    console.log(event, filename);
  }

  private readDirectory(filename: string) {
    const result = fs
      .readdirSync(filename, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());
    result.forEach((dirent) =>
      this.loadExtension(path.resolve(filename, dirent.name)),
    );
  }

  private async loadExtension(dirname: string) {
    // look for the package.json
    const file = fs.readFileSync(path.resolve(dirname, 'package.json'));
    const packageJson = JSON.parse(file.toString());
    const { name, version } = packageJson;
    const ext = await import(dirname);
    if (this.registry.has(name)) {
      console.warn(
        `An extension with the name ${name} was registered twice. The last registered definition will be used`,
      );
    }
    const instance: PublicationSource = container.resolve(ext.default || ext);
    instance.name = name; // temporary?
    // instance.version = version; // temporary?
    this.registry.set(name, {
      name,
      version,
      path: dirname,
      type: ExtensionType.PUBLICATION_SOURCE, // TODO: Add other types in the future probably
      instance,
    });
    console.log('Loaded Extension', name);
  }
}
