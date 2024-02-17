PGDMP         "                z            DevVideofloDb    11.6    11.6 0    H           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            I           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            J           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            K           1262    148460    DevVideofloDb    DATABASE     �   CREATE DATABASE "DevVideofloDb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE "DevVideofloDb";
             postgres    false            U           1247    205957    user_accountuserrole_enum    TYPE     T   CREATE TYPE public.user_accountuserrole_enum AS ENUM (
    '0',
    '1',
    '2'
);
 ,   DROP TYPE public.user_accountuserrole_enum;
       public       postgres    false            X           1247    205964    user_userrole_enum    TYPE     _   CREATE TYPE public.user_userrole_enum AS ENUM (
    '0',
    '1',
    '2',
    '3',
    '4'
);
 %   DROP TYPE public.user_userrole_enum;
       public       postgres    false            �            1259    205975    account    TABLE     C  CREATE TABLE public.account (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdOn" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" bigint,
    "updatedOn" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedBy" bigint
);
    DROP TABLE public.account;
       public         postgres    false            �            1259    205981    account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.account_id_seq;
       public       postgres    false    196            L           0    0    account_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;
            public       postgres    false    197            �            1259    205983    project    TABLE     �  CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    description character varying,
    roles jsonb,
    "appId" character varying(50) NOT NULL,
    "secretKey" character varying(100) NOT NULL,
    "accountId" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdOn" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" bigint,
    "updatedOn" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedBy" bigint
);
    DROP TABLE public.project;
       public         postgres    false            �            1259    205992    project_id_seq    SEQUENCE     �   CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.project_id_seq;
       public       postgres    false    198            M           0    0    project_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;
            public       postgres    false    199            �            1259    205994    user    TABLE     �  CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    "mobileNo" character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "userRole" public.user_userrole_enum DEFAULT '0'::public.user_userrole_enum NOT NULL,
    "mostRecentlyUsedProjectId" integer,
    "accountUserRole" public.user_accountuserrole_enum DEFAULT '1'::public.user_accountuserrole_enum,
    "accountId" integer,
    "userType" character varying NOT NULL,
    "isActive" boolean DEFAULT true,
    "createdOn" timestamp with time zone DEFAULT now(),
    "createdBy" bigint,
    "updatedOn" timestamp with time zone DEFAULT now(),
    "updatedBy" bigint
);
    DROP TABLE public."user";
       public         postgres    false    600    597    597    600            �            1259    206005    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       postgres    false    200            N           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
            public       postgres    false    201            �            1259    206007    user_projects_project    TABLE     o   CREATE TABLE public.user_projects_project (
    "userId" integer NOT NULL,
    "projectId" integer NOT NULL
);
 )   DROP TABLE public.user_projects_project;
       public         postgres    false            �            1259    206010    video_session    TABLE     �   CREATE TABLE public.video_session (
    id integer NOT NULL,
    "sessionId" character varying NOT NULL,
    name character varying,
    "createdOn" timestamp without time zone,
    "projectId" integer NOT NULL
);
 !   DROP TABLE public.video_session;
       public         postgres    false            �            1259    206016    video_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.video_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.video_session_id_seq;
       public       postgres    false    203            O           0    0    video_session_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.video_session_id_seq OWNED BY public.video_session.id;
            public       postgres    false    204            �
           2604    206018 
   account id    DEFAULT     h   ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);
 9   ALTER TABLE public.account ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196            �
           2604    206019 
   project id    DEFAULT     h   ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);
 9   ALTER TABLE public.project ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198            �
           2604    206020    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200            �
           2604    206021    video_session id    DEFAULT     t   ALTER TABLE ONLY public.video_session ALTER COLUMN id SET DEFAULT nextval('public.video_session_id_seq'::regclass);
 ?   ALTER TABLE public.video_session ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    204    203            =          0    205975    account 
   TABLE DATA               k   COPY public.account (id, name, "isActive", "createdOn", "createdBy", "updatedOn", "updatedBy") FROM stdin;
    public       postgres    false    196   �=       ?          0    205983    project 
   TABLE DATA               �   COPY public.project (id, name, description, roles, "appId", "secretKey", "accountId", "isActive", "createdOn", "createdBy", "updatedOn", "updatedBy") FROM stdin;
    public       postgres    false    198   �=       A          0    205994    user 
   TABLE DATA               �   COPY public."user" (id, email, name, "mobileNo", username, password, "userRole", "mostRecentlyUsedProjectId", "accountUserRole", "accountId", "userType", "isActive", "createdOn", "createdBy", "updatedOn", "updatedBy") FROM stdin;
    public       postgres    false    200   4?       C          0    206007    user_projects_project 
   TABLE DATA               F   COPY public.user_projects_project ("userId", "projectId") FROM stdin;
    public       postgres    false    202   m@       D          0    206010    video_session 
   TABLE DATA               X   COPY public.video_session (id, "sessionId", name, "createdOn", "projectId") FROM stdin;
    public       postgres    false    203   �@       P           0    0    account_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.account_id_seq', 1, true);
            public       postgres    false    197            Q           0    0    project_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.project_id_seq', 1, true);
            public       postgres    false    199            R           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 3, true);
            public       postgres    false    201            S           0    0    video_session_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.video_session_id_seq', 1801, true);
            public       postgres    false    204            �
           2606    206023 ,   video_session PK_083a33866299666671f5df38206 
   CONSTRAINT     l   ALTER TABLE ONLY public.video_session
    ADD CONSTRAINT "PK_083a33866299666671f5df38206" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.video_session DROP CONSTRAINT "PK_083a33866299666671f5df38206";
       public         postgres    false    203            �
           2606    206025 4   user_projects_project PK_26a180af1ec7a8550f5c374fcd8 
   CONSTRAINT     �   ALTER TABLE ONLY public.user_projects_project
    ADD CONSTRAINT "PK_26a180af1ec7a8550f5c374fcd8" PRIMARY KEY ("userId", "projectId");
 `   ALTER TABLE ONLY public.user_projects_project DROP CONSTRAINT "PK_26a180af1ec7a8550f5c374fcd8";
       public         postgres    false    202    202            �
           2606    206027 &   project PK_4d68b1358bb5b766d3e78f32f57 
   CONSTRAINT     f   ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.project DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57";
       public         postgres    false    198            �
           2606    206029 &   account PK_54115ee388cdb6d86bb4bf5b2ea 
   CONSTRAINT     f   ALTER TABLE ONLY public.account
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.account DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea";
       public         postgres    false    196            �
           2606    206031 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public         postgres    false    200            �
           2606    206033 #   user REL_68d3c22dbd95449360fdbf7a3f 
   CONSTRAINT     i   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_68d3c22dbd95449360fdbf7a3f" UNIQUE ("accountId");
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "REL_68d3c22dbd95449360fdbf7a3f";
       public         postgres    false    200            �
           2606    206035 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public         postgres    false    200            �
           2606    206037 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public         postgres    false    200            �
           2606    206039 &   project Unique_Project_appId_secretKey 
   CONSTRAINT     s   ALTER TABLE ONLY public.project
    ADD CONSTRAINT "Unique_Project_appId_secretKey" UNIQUE ("appId", "secretKey");
 R   ALTER TABLE ONLY public.project DROP CONSTRAINT "Unique_Project_appId_secretKey";
       public         postgres    false    198    198            �
           1259    206040    IDX_79daf0d2be103f4c30c77ddd6b    INDEX     f   CREATE INDEX "IDX_79daf0d2be103f4c30c77ddd6b" ON public.user_projects_project USING btree ("userId");
 4   DROP INDEX public."IDX_79daf0d2be103f4c30c77ddd6b";
       public         postgres    false    202            �
           1259    206041    IDX_936561888bfd63d01c79fe415c    INDEX     i   CREATE INDEX "IDX_936561888bfd63d01c79fe415c" ON public.user_projects_project USING btree ("projectId");
 4   DROP INDEX public."IDX_936561888bfd63d01c79fe415c";
       public         postgres    false    202            �
           2606    206042 ,   video_session FK_5788dfa22612d4dd3a223f0b86f    FK CONSTRAINT     �   ALTER TABLE ONLY public.video_session
    ADD CONSTRAINT "FK_5788dfa22612d4dd3a223f0b86f" FOREIGN KEY ("projectId") REFERENCES public.project(id);
 X   ALTER TABLE ONLY public.video_session DROP CONSTRAINT "FK_5788dfa22612d4dd3a223f0b86f";
       public       postgres    false    198    203    2734            �
           2606    206047 #   user FK_68d3c22dbd95449360fdbf7a3f1    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES public.account(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1";
       public       postgres    false    2732    200    196            �
           2606    206052 4   user_projects_project FK_79daf0d2be103f4c30c77ddd6be    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_projects_project
    ADD CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.user_projects_project DROP CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be";
       public       postgres    false    200    202    2738            �
           2606    206057 &   project FK_8d691f8d69acef59f4ed3a872c4    FK CONSTRAINT     �   ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4" FOREIGN KEY ("accountId") REFERENCES public.account(id);
 R   ALTER TABLE ONLY public.project DROP CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4";
       public       postgres    false    196    198    2732            �
           2606    206062 4   user_projects_project FK_936561888bfd63d01c79fe415c3    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_projects_project
    ADD CONSTRAINT "FK_936561888bfd63d01c79fe415c3" FOREIGN KEY ("projectId") REFERENCES public.project(id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.user_projects_project DROP CONSTRAINT "FK_936561888bfd63d01c79fe415c3";
       public       postgres    false    2734    198    202            =   D   x�3��LI�O��WpI-�,�4202�50�50U0��26�2��3422�0�60�26���#FW� 	��      ?   P  x��PKO�@>/��p�V�"M�XMlLj|�Z�)�����j����{�73���x��n1fBMa��	UJ���T]w�B��׍V@��H� ���SU�ǉ�D�H�V�ha
�>H��b!e�cȪ� !� dĬ2^�=�w]�D����Nǿ".z�[�hj�e~(���v�OAbOfЈ��a����V�y1��$�PP���J}a]�������C�_�8�|�b'�X�C�5cӍll�1ѳG����#4-����[93&f^b�N��8�����%��񒞫�׋�Kf0b�n�莪{#����s]�6Ntgd�l9��GYE�S���      A   )  x����n�@���Sto��p��P�����YT���o_�ݸ��O��ϗ��!�/\d��H�*?T��*���u�N����X^��_&ɻ�BR�B�m�q����e��Px� �m#jb�D;��ԘF���&W'k+"'.{^�')���  ���k����!F]�w��i��j�UQt��>�7������[Up�6�b@ӯ1�R�����_0�ه�[4ZMX];�����v����,�l�։����%��LO;���x^�i�Ў�ϑS�jpY��פ�*3����$I�n��~      C      x������ � �      D      x���Ɏ%9rE�^_�?P�Sl����vh��Ew	����_B��"{@g%:o�I�;69\���g�]���U[p�U;����������k�Y���������������~7�w�~8�aʇ����a�����}0�\�R�ʮ��Dr����~	:��~Cǣ���)�?%�м��m1Y|�>�5&�bq:%�	�&'�5'!�T����~����䍜��m����\�s�Ѹ�Js��Y�ë���Q�����2���j��w+��YV� -��ĝ�ј�t_ڢDlt2�-3I�#���q� ?���7�=\�n� �����_��̫_�_�."/݉��e�/#I�����=$1>|:�p��
5�
���*c�1ٕjČT�s�:m�Yj�>4����v�D#G���f��qJ�覙=��f����}hq&��:�Ծb�s�"1�jBm)e3��a���:|��悎��RM7&�Q�y�f�N��-����>t�F^�\����p)�jÐZk�!��y�5S��k�xU����܆�ǌt��3�d��č`��e�߇�����.Ǭ��Q���4��Úl��)�����P|Ohk�\��&V��k�4�u}��6DD���>����
�"k6�M��V����>r ��Nע�!YI��n�_!�(���p3��u�a��?ľP��mf#��[�Io�y8۴�?�.�{;}"[�Ѽ�.j+�
%1t7�WzȜ�Z-�9�_X3b���k;�R+=S�>{��6Tl�8��a���ۘ��������n��A7Q�H��K��H�����!s���{z@�|�A�ⵦ�����hƕ\��}�q�4~���,)+e��Ћ9�p���-�B�wH�ܧ�a��]n˱(X�vI��NI廽Ϻc�H�n���9Rv�ɨ|���m�~xk}O�k��D��@��%9{���+��/ALm5Dϑ�e�]BA>"��xi,����KwC�{d���҃ͻ�p�X����+��6�4�)%�0�ӛ�����)�����W�5ంB��ͥ~��Rm�+���w���ҵ�p��5_�V�tI�X( '8��_ҵ�T8�@?%���U:e]e��N�땍�Z$�7��t�́9H(@In����8{�$��>(��IcԬ�U�7��$�̭�1F�)��A����`�/�kXWH�*R[���x �.�RV$�>��&�Kkˡ�C��w/|&�K-y<w]�H���n���,�V��fT=�bz��1�$x�������b	��]tU0�����?"w
��,���r�m���*����쇘/H؉�>������$ǎ�j��fp�qΪ0����������%��ǘV�iV�]���4:�I�A|��
��&l#Qa� �Z�H��sM��#���3��'R�ռ��� �/촌/I��Tq!���m�H��+�k��1B1z��5K�&>88��f)��������a�����F�U�]�����4��3O��"���D��N%��")����.2˪B��rq�4Cq@���oy�цoĩOh�M��!,� ��ᦌ� $i�\PŕÆ"���oh������JB�`ߐeb+n�����? �~��C(i���=ЖZ0�̿n���,�gV^d���2���l���'+D��X�+��r�m���u��t!�c������_b�m"
H�����=!A8���KGm(K␇/�>��h�ؕ4/>#9i~�˱��aNjog pv��X��(ݶ�F�!��ʀ�@���p�L�X]�i���k\7�	�](�]q�5MSG�~�)-��|�T��W?Y�%T�V��	a�k8N��
����(�`�ҍ?�H�_���u���I]�.*�������[�ڨO$�.�0�����1ҟV��[8�G��e�[e8������9�I� "��D��㡫�1Y{�şH,K��q�vH|���H`M��1�/'	�y�\�z�Pn�xd�J���Ƞa_��q|:tx:;�p��B�6R:�!��nh�hZ��}9�^�f����H\���+��5~`U����(ĘR�/P���D�\�pT��Ӻ�[z�4��d]J�=���@+���w����5'L���Îj	����zRc�N�^��������`�h�uC�f��W��FR��_�o.��1�4Iw!!G��������HZ��g�@�v��rESdPZ�.��{ls姳�O��t��(G�}M��৖g��8��5�T�A�%�&�k\�Tȑ-��B|I�,�\�f��O�ί��:;jܕ��%�1�o��Hŷ�O��5兗�w������T��R����	�v�ӕ:���5�#���B�DHR��>5
)��GK�i��w�%�x�����I(A�U.������H�D*iWA2G�0���zdY
��G���]n�i#��1��&b�"��1�L���Dj]]����gh�
X�6:x6��_�����o�7_j���˺b4`FN/���gS�0x�8t�U�m��H��K���� �������{[�!5�������z�8̾�x)o�(E�K��C{gY��j�hܞ�èǀ讣��#��@z*��ot�D�<�D~��/	׋��K�S:8�՗�2�SӶ��-w���d��өH������5��FN31��@Ρ� r�����^'�f�0�]�6}�T�0
�+����V�l���g4���M�Fn�Ʌ�1u�_��Cbfi3��P�]r@Yf�Xb�^E)���)�+a�$��ub� ^a�K����&�8�״��=��84�`��+S-Y��>g]�yM^�+^�B�Yq?����@1c�)"���B
�7��7����-����M�j���+;&�> �^������^.����,�I8��b�3���H��.�kM�ȴz������'���l�V�F*��j`z�0�ȅHݮR���5�U��`l#��C�.�B���
���JS��pL����΍o�����5�)8H$��'�+�]�b׍�)P�r�-�T�NEs"�C�&̒9+�"�8�@�fW)կ��t��æ���r���v��IT#f��$����g�FR������?�MV'��4�t33��)��nfGo$�u��x�W�>v�o�O�/39gr\�L�w��wjF�N���`)����%OQ���O^o&�o$��������Ҍi�+����z���^��n�H��Ѹ�kM��B`���V&v�`U���޿<}ݙ8a_k�*�G估�Ђ5b��1�Ї�)����{�+��WȄ�Hv�	���Zy�Y��z�	PPS�7=%�Q񽵀[!o"
�<5M�Z�C9�{4����uɈhӂ � d����۱�W��G����9G�5��"���_��?J|�RQR�N�%�kMln�V�wT�)J�ӑ�Չ}m�𻵧�)*wq_@���uvJ��]��fc0)�OJ��pWN�HD|(#����)�djR:��W?XLؚ_��N[_µO�8y �]#OpO�z����J�'�ӛۼ_h$�3e-GI#°�ʒH-����.�����&�Jw�rv:pǌ����P{ J�yc�6��#��R��G��h\���:�>ǅpR���α;�e;��9�A�G��f !p�6�z��f��F��;�s��.J��n�Y�5����S�{o�F
:Y�^N�s��2"፽ƺ"�e��`�q��Ho%P�t!�?PG��#U,���V�q�&G}"����Gg�x9�]C��T|l��]כ
��|���D:�{I� �����x)��v%��Prk�����Ώ3;F!NGES\��A�p�2,:=�f��Ӹ)�W���:���We���^����K ���� +�S�������;v �%!��,އ��Ȱ�ϐ�v�\_WSV7N��	73Ǫ���a_���7�^�u{IO��
�P6�F�$P���m5���w�1kΡK��W��v�ςf�����}"������ܑ1����x�pgb�M�$"s�1?�D����ttq/٧��x�ja��>�ݧ�� '���k���	�Nz P	  �8���6�i��4�����?·/�8��A�鵴!�d��9��-�\��g"���1��#n��u�<��k���3�^a�g�p>+����ҁ�t<�����8C��ױJw#=����uR��qu`�W�-�	�t�4�9�V�An��D:G!�.qb� �d�����j׈��uK)j�KX�9!��p�:xNV�AWLY�G�OU R�g:?���JL�Bp�Vg��k�k�u3y#�]�&�3]�q۬7�!��*a�CiGt|�q��I��Q�S���Z
����	Q��&���5�\�WfI^��ԫ�<�"N����]��n>Q�W�D����!�c����s4!�����0��5�ϐ0qOCI{_�ВΑA��I�ԭ����a/��Z���ܯ��ǉe���ğ�8yxz�Z{ާ�!�u�U�	?�� Γz(qZ�)�+S��(jd��ڦr m!h0\�{�n5�B�O���O��&�ЗJ���MB�oݭ���8!�Gv�K*e'��>B�û�;��:*�E$_��{_��5��������#�:�)C_��F�7Kra<�����Ӌ$P0�@��+�Xfr�QS1c�n��F��K�kIr4N���^��
e݀U`�z6/ Ѧ��� � �4T<.8.����t�&�xD��I�DO4�)�ѱ�C\�3�[@r���f������6i &���u���V�mU� ^6+��A ���P~!E�>e?�H���IX.��SZ+c�q!r�7�z>���R���xwΛpgE����p5`����'�z'\�&���If�T1L����V�O]�S'9�}����ϙ�3��f��҆��E�?"ay��VApGUc�G�g1ȟ%�*=SVx�'�u?I�*q�}��L"�{�%�#CrĄb{\�y����PTX.c�K0�&�Z)y�cݬY]/t����_���z���׉%�"`����M��F}�_��9�����i��13<��3�q���B��#��k}NS ��:����Ʈ�D�Fg�	�$5=�U��jk����4x�W��a���=�9�D��ҕP����Z�j;�]�����'>2fԶ����	6��J&Sԕ�XU=<fX��J�������V���5(D����x��6�_�kVY_ߋ��t�M9�n��� ~�ѫ�Ň	S;4���, Y���`�5�����hx�@y�l�:r��#����'�9[%n$�f������;�B��9
;����$�Qga�Ǽ�>θ(��Ofc�T����T�m�
���.�@�
=u�������i��l}J<Iż'}Ah�R�V3M����|�Y�@@o�ɟ�)�_�^S>��������L��)vL���}#�~�]8�t_@u%�B��Yɤ�+>�C��K�S�׋ʄ]4�^$���^��H�ަ��xՍ���շ��h��21�p�j�ӗ�o8t���;�����|���ڥ�K}��?_��E�?5��O����e@MRa�fq�'0n�F
�n�w�Ύ��m�8
 �,��2�e3��{
��f���j^����՗GŨD�Yze Se�G$���c�D��/��:S��x�gˡČڧ[C���~����g4�l�982�0�86��Hxy�&�)�K��6�D�����3�h��zb��A��'H�M�{ԛ��m�x"�>Ϊ�Mr��+:6��)$�E�k6�a�5��\,�Ʒ�l\ �p������
��#�Me�4�J�)m�����9%����'�C��ay�Na8�R-�N�v�f��͸�T��;�e`K�HĂ9O}"q@J�M,�F��!ѽr�^�*W��>��z�VRL�\
](�Z����
�ez��3���8%/�8���l�����-���)�k�u N�8�ΟE �iQ_-}km�������n'������4Y�A
�]!=���sd�#�����K��	�=6������Թp+:j ����]H~O�v�!w&��	ND��b]j�*=�b���3���9���S�d��X٢Y��BR�4s��w�畩6����.�b����XȽ�#�z7ɷb𝫯�Bݗ��×�a^*:@�:�o��}��Z9�h��2���S��]qrO8`,�b��60c�A�n�پ�,�_��"44
�}�H�4C\7Un�x�.��É�6D6Ɯ}Z䪢rD٢�'{�<}]9o�����x4K���E7ͫT�R�%<�	W�M���)ަsH��P�t�[���%���Fo$9�֚k�Y�Ǌ���z�z��a��*c^n����s�s�m���=�ar�GX<a@��������M��qW>��+� ���3N;��pv|�η}N��Rn�)��q΁t0�F�W�d��y)�%�؜��9�O�Z��ݚ��s���'����~��g��     