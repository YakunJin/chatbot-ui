//使用这个config可以配合vscode插件
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'custom-F8F9FD': '#F8F9FD',
        'custom-EDEFF9': '#EDEFF9',
        'custom-335DFF': '#335DFF',
        'custom-E5E8FE': '#E5E8FE',
      },
      borderColor: {
        'custom-335DFF': '#335DFF',
        'custom-D7DFFF': '#D7DFFF',
        'custom-939393': '#939393', 
        'custom-gray': 'rgba(51,93,255,0.20)', 
      },
      borderRadius: {
        'custom-21': '21px',
        'custom-100': '100px',
        'custom-right': '12px 12px 0 12px',
        'custom-left': '12px 12px 12px 0',
      },
      textColor: {
        'custom-335DFF': '#335DFF',
        'custom-939393': '#939393',
        'custom-636363': '#636363',
        'custom-ff5555': '#ff5555',
      },
      width: {
        'custom-11': '11px',
        'custom-362': '362px',
        'custom-349': '349px',
        'custom-375': '375px'
      },
      height: {
        'custom-18': '18px',
        'custom-19': '19px',
        'custom-42': '42px',
        'custom-44': '44px',
        'custom-218': '218px',
        'custom-812': '812px'
      },
      lineHeight: {
        'custom-42': '42px',
      },
      backgroundImage: {
        'custom-icon-message': "url('/src/res/icon_message.png')",
        'custom-icon-message-hover': "url('/src/res/icon_message_hover.png')",
        'custom-icon-detail': "url('/src/res/icon_detail.png')",
        'custom-icon-detail-hover': "url('/src/res/icon_detail_hover.png')",
        'custom-icon-paper': "url('/src/res/icon_paper.png')",
        'custom-icon-more': "url('/src/res/icon_more.png')",
        'custom-icon-upload': "url('/src/res/icon_upload.png')",
        'custom-icon-edit': "url('/src/res/icon_edit.png')",
        'custom-icon-trash': "url('/src/res/icon_trash.png')",
        'custom-icon-negative': "url('/src/res/icon_negative.png')",
        'custom-icon-positive': "url('/src/res/icon_positive.png')",
        'custom-icon-negative-red': "url('/src/res/icon_negative_red.png')",
        'custom-icon-positive-blue': "url('/src/res/icon_positive_blue.png')",
        'custom-icon-user': "url('/src/res/icon_user.png')",
      }
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  // plugins: [require('@tailwindcss/typography')],
};
