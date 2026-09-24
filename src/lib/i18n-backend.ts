import type { BackendModule, ReadCallback, ResourceKey } from 'i18next';

export type DictionaryLoader = () => Promise<{ default: ResourceKey }>;

/**
 * A tiny i18next backend that fetches dictionaries as lazy Vite chunks.
 *
 * Routing the download through a real backend, instead of bolting bundles on
 * with addResourceBundle after the fact, is what lets i18next and
 * react-i18next do their jobs:
 *
 * - i18next doesn't report itself initialised until the detected language
 *   has arrived, so components suspend rather than rendering English under a
 *   German `<html lang>` and never re-rendering.
 * - changeLanguage waits for the dictionary, and its isLanguageChangingTo
 *   guard throws away a slow switch the visitor has already changed their
 *   mind about.
 */
export function createLazyBackend(
  loaders: Record<string, DictionaryLoader>,
): BackendModule {
  return {
    type: 'backend',
    init() {},
    read(language: string, _namespace: string, callback: ReadCallback) {
      // hasOwn, not `in`: a language code must never resolve to something
      // inherited from Object.prototype.
      if (!Object.hasOwn(loaders, language)) {
        // English ships in the main bundle, so there's nothing to fetch. An
        // empty, successful read lets i18next carry on without retrying.
        callback(null, {});
        return;
      }

      loaders[language]()
        .then((module) => callback(null, module.default))
        // `false` marks the failure as not worth retrying: browsers cache a
        // failed dynamic import, so asking again would fail the same way.
        .catch((error: unknown) =>
          callback(error instanceof Error ? error : String(error), false),
        );
    },
  };
}
