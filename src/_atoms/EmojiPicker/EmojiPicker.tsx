import { FC, useRef, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import styles from './EmojiPicker.module.scss';
import { SearchInputAtom } from '../SearchInput/SearchInput';
import type { IEmojiPickerAtom } from './EmojiPicker.types';

export const EmojiPickerAtom: FC<IEmojiPickerAtom> = ({ children, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState('');

  const emojiList = useRef([
    { name: 'улыбка', char: '😊' },
    { name: 'смех', char: '😀' },
    { name: 'хохот', char: '😂' },
    { name: 'радость', char: '😄' },
    { name: 'сияние', char: '😁' },
    { name: 'обожание', char: '😍' },
    { name: 'поцелуй', char: '😘' },
    { name: 'подмигивание', char: '😉' },
    { name: 'задумчивость', char: '🤔' },
    { name: 'нейтрально', char: '😐' },
    { name: 'сомнение', char: '🤨' },
    { name: 'недоверие', char: '🙄' },
    { name: 'разочарование', char: '😞' },
    { name: 'грусть', char: '😢' },
    { name: 'плач', char: '😭' },
    { name: 'испуг', char: '😱' },
    { name: 'шок', char: '😮' },
    { name: 'злость', char: '😠' },
    { name: 'ярость', char: '🤬' },
    { name: 'бешенство', char: '😡' },
    { name: 'боль', char: '🤕' },
    { name: 'тошнота', char: '🤢' },
    { name: 'ковид', char: '🤧' },
    { name: 'усталость', char: '😩' },
    { name: 'сон', char: '😴' },
    { name: 'круто', char: '😎' },
    { name: 'стеснение', char: '😅' },
    { name: 'забота', char: '🤗' },
    { name: 'молчание', char: '🤐' },
    { name: 'вкусно', char: '😋' },
    { name: 'язык', char: '😛' },
    { name: 'клоун', char: '🤡' },
    { name: 'инопланетянин', char: '👽' },
    { name: 'робот', char: '🤖' },
    { name: 'палец вверх', char: '👍' },
    { name: 'палец вниз', char: '👎' },
    { name: 'ок', char: '👌' },
    { name: 'рукопожатие', char: '🤝' },
    { name: 'скрещенные пальцы', char: '🤞' },
    { name: 'сердце', char: '❤️' },
    { name: 'огонь', char: '🔥' },
    { name: 'звезда', char: '⭐' },
    { name: 'солнце', char: '☀️' },
    { name: 'луна', char: '🌙' },
    { name: 'кошка', char: '🐱' },
    { name: 'собака', char: '🐶' },
    { name: 'лев', char: '🦁' },
    { name: 'панда', char: '🐼' },
    { name: 'пицца', char: '🍕' },
    { name: 'бургер', char: '🍔' },
    { name: 'футбол', char: '⚽' },
    { name: 'музыка', char: '🎵' },
    { name: 'кино', char: '🎬' },
    { name: 'подарок', char: '🎁' },
    { name: 'праздник', char: '🎉' },
    { name: 'флаг', char: '🏁' },
  ]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  const selectEmoji = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset;

    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <>
      <IconButton className={styles.btn} onClick={handleClick}>
        {children}
      </IconButton>

      <Popover
        className={styles.emojiPickerPopover}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <SearchInputAtom value={search} onChange={handleSetSearch} />

        <div className={styles.emojiList}>
          {emojiList.current
            .filter((item) => item.name.toLowerCase().startsWith(search))
            .map((item) => {
              return (
                <div key={item.name} data-value={item.char} className={styles.emojiList_item} onClick={selectEmoji}>
                  {item.char}
                </div>
              );
            })}
        </div>
      </Popover>
    </>
  );
};
