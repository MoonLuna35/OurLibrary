export class RegEx {
    public static AUTH_FOR_LIST_PATERN = /^(?:\d+;)*$/;
    public static ALPHA_PATERN = "^[a-zA-Z_ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ ]+$"
    public static MAIL_PATERN = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-z]{2,}$/;
    public static TEL_PATERN = /^\d{9,12}$/;
    public static TEL_CHAR_TO_REMOVE = /[-.() ]+/;
    public static CONTAIN_UPPER_PATERN = /[A-Z]+/;
    public static CONTAIN_UNDER_PATERN = /[a-z]+/;
    public static CONTAIN_NUM_PATERN = /[0-9+]+/;
    public static CONTAIN_SPECIAL_PATERN = /\W+/;
    public static URL_PATERN  = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
}