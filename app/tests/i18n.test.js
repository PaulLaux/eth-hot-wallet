import { DEFAULT_LOCALE } from '../containers/App/constants';
import { formatTranslationMessages } from '../i18n';

vi.mock('../translations/en.json', () => ({
  default: {
    message1: 'default message',
    message2: 'default message 2',
  },
}));

const esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: '',
};

describe('formatTranslationMessages', () => {
  it('should build only defaults when DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages(DEFAULT_LOCALE, { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });


  it('should combine default locale and current locale when not DEFAULT_LOCALE', () => {
    const result = formatTranslationMessages('', esTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2',
    });
  });
});
